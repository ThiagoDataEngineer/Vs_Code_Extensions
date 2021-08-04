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
def CriaTabfil(aRobos, cTpFilter):
    aRet = []
    for i in aRobos:
        aRet.append(filtro1(i, [x.strip(' ') for x in i['Programa'].value_counts().index.tolist()], cTpFilter)) #retorna os dataFrames referentes as planilhas coverlocal_testcase_
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

def ContagemMerge(aTabFil, cType):
    aCont = []
    
    if cType == 1:    
        print('Analisando as linhas cobertas...')
    else:
        print('Analisando as linhas nao cobertas...')

    nCont = 0
    while nCont < len(aTabFil):     
        
        for nLivre in range(len(aTabFil[nCont])):

            if aTabFil[nCont][nLivre]['Programa'].count() > 0:
                break

        if nLivre <= len(aTabFil[nCont])-1:
            df = aTabFil[nCont][nLivre]    
          
            for i in tqdm(range(len(aTabFil))):
                
                for j in range(len(aTabFil[i])):
                    if aTabFil[i][j]['Programa'].count() > 0:
                        if ((aTabFil[i][j]['Programa'].iloc[0]).strip(' ') == (df['Programa'].iloc[0]).strip(' ')):
                            df = megerdata(df, aTabFil[i][j], 'Linha', cType)
                            aTabFil[i][j] = pd.DataFrame(columns = ['Programa', 'Linhas', 'Passou', 'Nao Passou', '% Cobertura']) 

            df = df.copy()    
            df['Principal_Function'] = ''
            df['Entire_Function']    = ''

            if not (df.empty) and (len(dir_Fontes) > 0) and (cType == 2):
                df = fSearchFunc(df) 

            aCont.append(df)  

            time.sleep(0.001)
        
        nCont += 1

    return aCont

#Abre o arquivo do fonte e procura Static Functions nao cobertas

def fSearchFunc(df):

    df = df.sort_values(by=['Linha'], ascending=False)
    #df['Principal_Function'] = ''
    #df['Entire_Function'] = ''
    cLowerStatic = 'Function '.lower()
    cLowerStatic1 = 'class '.lower()
    cLowerStatic2 = 'method '.lower()

    for i in dir_Fontes:
        if df['Programa'].str.contains(i[:-4].upper()).iloc[0]:            
            with open(r"" + path_Fontes + i ,"r", encoding="iso-8859-1") as f:
                lines = f.readlines()
                lines = [x.lower() for x in lines]
                
                for row in df.index:                    

                    if df.loc[row, 'Principal_Function'] == '':
                        cod = df.loc[row, 'Linha']
                        try:
                            if (cLowerStatic in lines[cod] or cLowerStatic1 in lines[cod] or cLowerStatic2 in lines[cod]) and '//' not in lines[cod]:
                                df = Set_Advpl_Function_Name(row, 'Principal_Function', lines[cod][0:27], df)
                                df = Set_Advpl_Function_Name(row, 'Entire_Function', 'Yes', df)
                            else:   

                                for rev in reversed(range(cod)):

                                    if (cLowerStatic in lines[rev] or cLowerStatic1 in lines[rev] or cLowerStatic2 in lines[rev]) and '//' not in lines[rev]:
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

    dfResult = pd.DataFrame({'Programa': cText, 'Linhas' : nTotal_base, 'Passou': TotalCob_base,'Nao Passou': nTotal_base - TotalCob_base,'% Cobertura': nPerc_base,\
        '%Cada_1_Linha': 100/nTotal_base}, index=[0.5])
    
    dfRes = dfRes.append(dfResult, ignore_index = True, sort=False)  
    
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
def Fil_Analisys(afilterFontes, aRobos):
    
    # Aqui e efetuado o filtro em cada robo por: fonte e linhas cobertas 
    aTabFil_Cob = CriaTabfil(aRobos, '1')
    aCont = ContagemMerge(aTabFil_Cob, 1) # Aqui efetuo a juncao das tabelas para obter a soma total de cobertura por fontes

    # Aqui e efetuado o filtro em cada robo por: fonte e linhas Nao cobertas 
    aTabFil_NCob = CriaTabfil(aRobos, '2')
    aCont_NCoc = ContagemMerge(aTabFil_NCob, 2)

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

        cNameSemCob = path_Results + 'Linhas_Sem_Cobertura_' + afilterFontes[i] + ".xlsx" 
        with pd.ExcelWriter(cNameSemCob) as writer:  
            df_Aba_Principal.to_excel(writer, index = False, header=True, sheet_name = 'Aba_Principal') 
            df_ofensores.to_excel(writer, index = False, header=True, sheet_name = 'Aba_Contagem') 

        alist_Plan_Result.append(cNameSemCob)
       
    dfTotalCover = pd.DataFrame(columns = ['Programa', 'Linhas', 'Passou', 'Nao Passou', '% Cobertura']) 

    # Demonstracao dos resultados em tela
    for i in range(len(afilterFontes)):
        dfTotalCover = resultado(afilterFontes[i], aTotalLin[i], aCont[i], dfTotalCover)

    print()
    print('Resultados da Gerais: ')
    print(tabulate(dfTotalCover.sort_values(by=['% Cobertura'], ascending = False), headers='keys', tablefmt='psql'))    

    #Geracao planilha Total_Results com a visao analitica dos resultados de cada fonte aos moldes da coverlocal_cover_
    #df.to_excel(r'Total_Results.xlsx', index = False, header=True) 
    cName_Total_Results = path_Results + 'Total_Results.xlsx'
    with pd.ExcelWriter(cName_Total_Results) as writer:           # Drop to csv w/ context manager
        #df.to_csv(reference, sep = ",", index = False)
        dfTotalCover.to_excel(writer, index = False, header=True, sheet_name = 'Resultados Consolidados') 

    #alist_Plan_Result.append(cName_Total_Results +  ' - Planilha possui todas as metricas da analise, no tocante a cobertura de fonte por robo gerado.')    

    print('')    
    print('Como resultado, foram geradas as seguintes planilhas, para analise no detalhe de Fonte, Funcao e Linha:')
    print('')
    print(*alist_Plan_Result, sep = "\n") 
    print('----------------------------------------------------------------------------------------------------- \n')
            
#Aqui comeca
#--------------------------------------------------------------------------------------------------------------

packages = ['pandas', 'openpyxl', 'linecache', 'tabulate', 'time', 'tqdm', 'sys', 'numpy', 'os', 'sys', 're', 'subprocess']
install_and_import(packages)

import pandas as pd 
from pandas import ExcelWriter   
from tabulate import tabulate
from time import sleep
from tqdm import tqdm

import numpy as np
import os, sys
import re # Import re module to use regular expression
from datetime import datetime

import subprocess
import sys

# Open a file
if len(sys.argv) > 1:
    path = sys.argv[1]
    path_Fontes = sys.argv[2]
    if sys.argv[3] != '':
        path_Results = sys.argv[3]
    else:
        path_Results = path   
else:
    path = '.\\'
    path_Fontes = path + 'Fontes\\'
    path_Results = path

dirs = os.listdir( path )

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
    
    # Aqui busco todos os robos que serao analisados conforme os arquivos coverlocal_testcase_ encontrados na pasta
    aRobos = opendados(coverl_testcase_tab, path)

    #Aqui sei quais foram os fontes analisados e quantas linhas cada um deles possui
    afilterFontes = list()
    aTotalLin = list()
    for rb in aRobos:
        afilterFontes.extend([x.strip(' ') for x in rb['Programa'].value_counts().index.tolist()])#afilter   = nome dos fontes que deseja analisar a cobertura
        aTotalLin.extend(rb.groupby("Programa")['Linha'].count().tolist()) #aTotalLin = quantidade de linhas de cada um dos fontes informados nas tabelas coverlocal_cover_
    
    afilterFontes = list(dict.fromkeys(afilterFontes))
    aTotalLin = list(dict.fromkeys(aTotalLin))

    print('Foram cobertos', len(afilterFontes), 'fonte(s): ')
    print(*afilterFontes, sep = "\n") 
    print('----------------------------------------------------------------------------------------------------- \n')

    print('Executando analise da cobertura X Fonte...')
    Fil_Analisys(afilterFontes, aRobos)
    
    fMens(1)
     
else:
    fMens(3)