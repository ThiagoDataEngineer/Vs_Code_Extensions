import numpy as np
import os, sys
import re # Import re module to use regular expression
from datetime import datetime

import subprocess
import sys

#----------------------------------------------
# Valida existencia de pacotes necessarios em tempo de execucao
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def install_and_import(package):
    import importlib
    for i in package:
        try:
            importlib.import_module(i)
        except ImportError:
            import pip
            pip.main(['install', i])
        finally:
            globals()[i] = importlib.import_module(i)
        
#----------------------------------------------
# Abre tabelas - Retorna uma lista contendo todas as planilhas em formato de tabelas
def opendados(abases, cPath):
    aRet = []
    for i in abases:
        df = OpenTab(i, cPath)
        aRet.append(df)
    return aRet

def OpenTab(cName, cPath): 
    return pd.read_csv(cPath + cName + '.csv', sep = ';')

#Cria tabelas filtradas coverlocal_testcase_ e as organizam em um array bidimensional onde cada coluna e um dataFrame diferente
def CriaTabfil(aRobos, afilter, cTpFilter):
    aRet = []
    for i in aRobos:
        aRet.append(filtro1(i, afilter, cTpFilter)) #retorna os dataFrames referentes as planilhas coverlocal_testcase_
    return aRet

# Filtro de tabelas coverlocal_testcase_ em um array unidimensional
def filtro1(base, afilter, cTpFilter):
    aRet = []
    for i in afilter:
        if cTpFilter == '1':
            #df = base[base['Casos de Testes'].str.contains("0") & base['Programa'].str.contains(i)] 
            df = base[base['Casos de Testes'].str.contains("\w", regex=True) & base['Programa'].str.contains(i)]
        else:
            df = base[base['Casos de Testes'].str.isspace() & base['Programa'].str.contains(i)]
            #df = base[base['Casos de Testes'].str.contains("\w", regex=True) & base['Programa'].str.contains(i)]
        aRet.append(df)
    return aRet

def ContagemMerge(aTabFil, nTamCols, cType):
    aCont = []
    
    if cType == 1:    
        print('Analisando as linhas cobertas...')
    else:
        print('Analisando as linhas nao cobertas...')

    for i in tqdm(range(nTamCols)):
        for j in range(len(aTabFil)):
            if j == 0:
                df = aTabFil[j][i]
            else:
                df = megerdata(df, aTabFil[j][i], 'Linha', cType)
        
        df = df.copy()    
        df['Principal_Function'] = ''
        df['Entire_Function']    = ''

        if (len(dir_Fontes) > 0) and (cType == 2):
            df = fSearchFunc(df) 

        aCont.append(df)  

        time.sleep(0.01) 
        
    return aCont

#Abre o arquivo do fonte e procura Static Functions nao cobertas

def fSearchFunc(df):

    df = df.sort_values(by=['Linha'], ascending=False)
    #df['Principal_Function'] = ''
    #df['Entire_Function'] = ''
    cLowerStatic = 'Function '.lower()

    for i in dir_Fontes:
        if df['Programa'].str.contains(i[:-4]).iloc[0]:            
            with open(r"" + path_Fontes + i ,"r", encoding="iso-8859-1") as f:
                lines = f.readlines()
                lines = [x.lower() for x in lines]
                
                for row in df.index:                    

                    if df.loc[row, 'Principal_Function'] == '':
                        cod = df.loc[row, 'Linha']
                        try:
                            if cLowerStatic in lines[cod] and '//' not in lines[cod]:
                                df = Set_Advpl_Function_Name(row, 'Principal_Function', lines[cod][0:27], df)
                                df = Set_Advpl_Function_Name(row, 'Entire_Function', 'Yes', df)
                            else:   

                                for rev in reversed(range(cod)):

                                    if cLowerStatic in lines[rev] and '//' not in lines[rev]:
                                        df.loc[(df['Linha'] == rev) & (df['Principal_Function'] == '') , 'Entire_Function'] = 'Yes'
                                        df.loc[(df['Linha'] >= rev) & (df['Principal_Function'] == '') , 'Principal_Function'] = lines[rev][0:27]
                                    
                                        break                                                              
                                
                        except IndexError:
                            pass
                
    return df

def Set_Advpl_Function_Name(nPos, cColumn, cValue, df):
    df = df.copy()
    df.loc[nPos, cColumn] = cValue
    
    return df    

# ---------------------------------------------------------------

# Contagem do Dados coverlocal_cover_
def ContagemMergeFontes(aFontes, cCampo):
    df = pd.DataFrame()
    aCont = []
    for i in range(len(aFontes)):
        if i == 0:
            df = aFontes[i]
        else:
            df = megerdata(df, aFontes[i], cCampo, 1)   

        df = df.dropna(subset=['Programa'])    
        df = df.dropna(subset=['Linhas'])    
    return df   

# Contagem do Dados coverlocal_testcase_
def megerdata(base1, base2, cCampo, cType):
    
    if cType ==  1:
        base1 = base1.merge(base2[cCampo], on=cCampo, how='outer')
    elif (cType == 2) & (not base2.empty):
        base1 = base1.merge(base2[cCampo], on=cCampo, how='inner')    
    
    return base1        

# Filter function - E feita a contagem de arquivos com nomenclatura = cFiltro + Nome de cada arquivo da pasta
def Filter(arqlist, cFiltro):
    
    for i in range(len(arqlist)):
        arqlist[i] = arqlist[i].replace('.csv', '')
    
    # Search data based on regular expression in the list
    return [val for val in arqlist        
        if re.search(r'^' + cFiltro, val)]
#----------------------------------------------


def resultado(cText, nTotal_base, base, dfRes):
        
    TotalCob_base = base['Linha'].count()
    
    nPerc_base = ((TotalCob_base * 100)/nTotal_base)
        
    dfRes.at[dfRes[dfRes['Programa'].str.contains(cText)].index[0],'Passou'] = TotalCob_base
    dfRes.at[dfRes[dfRes['Programa'].str.contains(cText)].index[0],'Nao Passou'] = nTotal_base - TotalCob_base
    dfRes.at[dfRes[dfRes['Programa'].str.contains(cText)].index[0],'% Cobertura'] = nPerc_base
    dfRes.at[dfRes[dfRes['Programa'].str.contains(cText)].index[0],'%Cada_1_Linha'] = 100/nTotal_base
    
    
    return dfRes

#Nao ha dados suficentes para analise
def fMens(nType):
                
        if nType == 1:
            print('********************************************************************************')
            print('Gerada planilha analitica Total_Results.xlsx com todas as metricas da analise, no tocante a cobertura de fonte por robo gerado.')
            print('********************************************************************************')
        elif nType == 2:
            print('********************************************************************************')
            print('Nao ha dados suficientes para a analise. - Verifique os arquivos coverlocal_cover .')
            print('********************************************************************************')
        elif nType == 3:
            print('********************************************************************************')
            print('Nao ha dados suficientes para a analise. - Verifique os arquivos coverlocal_testcase .')
            print('********************************************************************************')

#Filtra as linhas e analisa os resultados
def Fil_Analisys(afilterFontes, aRobos, dfFontes):
    
    # Aqui e efetuado o filtro em cada robo por: fonte e linhas cobertas 
    aTabFil_Cob = CriaTabfil(aRobos, afilterFontes, '1')
    aCont = ContagemMerge(aTabFil_Cob, len(afilterFontes), 1) # Aqui efetuo a juncao das tabelas para obter a soma total de cobertura por fontes


    # Aqui e efetuado o filtro em cada robo por: fonte e linhas Nao cobertas 
    aTabFil_NCob = CriaTabfil(aRobos, afilterFontes, '2')
    aCont_NCoc = ContagemMerge(aTabFil_NCob, len(afilterFontes), 2)

    alist_Plan_Result = []    
    for i in range(len(afilterFontes)):
        df = aCont_NCoc[i].sort_values(by=['Linha'])
        df_Aba_Principal = df[['Programa', 'Linha', 'Principal_Function', 'Entire_Function']]
        #Ofensores agrupados por function e ordenados por maior numero de linhas
        df_ofensores = df_Aba_Principal.groupby(['Principal_Function']) \
                            .count() \
                            .reset_index()
        df_ofensores = df_ofensores[['Principal_Function', 'Programa']]
        df_ofensores.rename({'Programa': 'Linhas_Nao_Cobertas'}, axis=1, inplace=True)
        df_ofensores = df_ofensores.sort_values(by=['Linhas_Nao_Cobertas'], ascending = False)

        cNameSemCob = ''+'Linhas_Sem_Cobertura_' + afilterFontes[i] + ".xlsx" 
        with pd.ExcelWriter(path + cNameSemCob) as writer:  
            df_Aba_Principal.to_excel(writer, index = False, header=True, sheet_name = 'Aba_Principal') 
            df_ofensores.to_excel(writer, index = False, header=True, sheet_name = 'Aba_Contagem') 

        alist_Plan_Result.append(cNameSemCob)
       

    dfTotalCover = dfFontes[['Programa', 'Linhas', 'Passou', 'Nao Passou', '% Cobertura']]
    # Demonstracao dos resultados em tela
    for i in range(len(afilterFontes)):
        df = resultado(afilterFontes[i], aTotalLin[i], aCont[i], dfTotalCover)

    print()
    print('Resultados da Gerais: ')
    print(tabulate(df.sort_values(by=['% Cobertura'], ascending = False), headers='keys', tablefmt='psql'))    

    #Geracao planilha Total_Results com a visao analitica dos resultados de cada fonte aos moldes da coverlocal_cover_
    #df.to_excel(r'Total_Results.xlsx', index = False, header=True) 
    cName_Total_Results = 'Total_Results.xlsx'
    with open(path + cName_Total_Results, "w") as reference:           # Drop to csv w/ context manager
        #df.to_csv(reference, sep = ",", index = False)
        df.to_excel(r'' + cName_Total_Results, index = False, header=True) 

    #alist_Plan_Result.append(cName_Total_Results +  ' - Planilha possui todas as metricas da analise, no tocante a cobertura de fonte por robo gerado.')    

    print('')    
    print('Como resultado, foram geradas as seguintes planilhas, para analise no detalhe de Fonte, Funcao e Linha:')
    print('')
    print(*alist_Plan_Result, sep = "\n") 
    print('----------------------------------------------------------------------------------------------------- \n')
            
#Aqui comeca
#--------------------------------------------------------------------------------------------------------------

packages = ['pandas', 'openpyxl', 'linecache', 'tabulate', 'time', 'tqdm', 'sys']
install_and_import(packages)

import pandas as pd 
from pandas import ExcelWriter   
from tabulate import tabulate
from time import sleep
from tqdm import tqdm

# Open a file
if sys.argv[1] != '':
    path = sys.argv[1]
else:
    path = '.\\'

dirs = os.listdir( path )

if sys.argv[2] != '':
    path_Fontes = sys.argv[2]
else:
    path_Fontes = path + 'Fontes\\'

if os.path.isdir(path_Fontes):
    dir_Fontes = os.listdir( path_Fontes )
else:
    dir_Fontes = []    

#Defino os arquivos de robo
coverl_testcase_tab = Filter(dirs, 'coverlocal_testcase') #coverl_testcase_tab    = arquivos do tipo coverlocal_testcase encontrados na pasta raiz

if len(coverl_testcase_tab) > 0:

    print('----------------------------------------------------------------------------------------------------- \n')
    print('Temos', len(coverl_testcase_tab),  'arquivo(s) de coverage a ser(em) analisado(s): ')
    print(*coverl_testcase_tab, sep = "\n") 
    print('----------------------------------------------------------------------------------------------------- \n')
    
    aFontes   = Filter(dirs, 'coverlocal_cover')
    if len(aFontes) > 0:

        #Defino quais fontes foram selecionados para coverage    
        aFontes   = opendados(aFontes, path)    
        dfFontes  = ContagemMergeFontes(aFontes, 'Programa')

        #Aqui sei quais foram os fontes analisados e quantas linhas cada um deles possui
        afilterFontes = dfFontes['Programa'].unique().tolist() #afilter   = nome dos fontes que deseja analisar a cobertura
        aTotalLin     = dfFontes['Linhas'].unique().tolist() #aTotalLin = quantidade de linhas de cada um dos fontes informados nas tabelas coverlocal_cover_

        print('Foram cobertos', len(afilterFontes), 'fonte(s): ')
        print(*dfFontes['Programa'], sep = "\n") 
        print('----------------------------------------------------------------------------------------------------- \n')

        # Aqui busco todos os robos que serao analisados conforme os arquivos coverlocal_testcase_ encontrados na pasta
        aRobos = opendados(coverl_testcase_tab, path)

        print('Executando analise da cobertura X Fonte...')
        Fil_Analisys(afilterFontes, aRobos, dfFontes)
       
        fMens(1)
    else:
        fMens(2)   
else:
    fMens(3)

    
