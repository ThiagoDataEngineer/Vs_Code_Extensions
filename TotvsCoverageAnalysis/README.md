# Totvs Coverage Analysis

Bem vindo a extensao para analise de dados resultantes do Coverage de fontes TOTVS. [MarketPlace.VsCode](https://marketplace.visualstudio.com/items?itemName=shinydataanalysis.totvs-coverage-analysis&ssr=false#overview)

Suporte para analise de dados resultantes do Coverage de fontes TOTVS.

![executing_extension](https://user-images.githubusercontent.com/34511940/86963662-426ea480-c13b-11ea-91fa-5ba55b31fb4b.gif)

Essa extensao analisa e extrai os dados que realmente importam, entre diversos arquivos de coverage gerados.

* Total_Results -> Demonstra os percentuais de cobertura consolidados entre todos os Suites de Teste:

![total_results_image](https://user-images.githubusercontent.com/34511940/86964405-62eb2e80-c13c-11ea-8a21-92aff546e411.png)

* Linhas_Sem_Cobertura_FONTEXXX -> Consolidacao das linhas sem cobertura, especificando a funcao que a linha pertence, priorizacao das funcoes menos cobertas e identificacao caso a funcao inteira esteja sem cobertura:

![blank_lines_principal_counts_image](https://user-images.githubusercontent.com/34511940/86968908-4a324700-c143-11ea-814f-744d0a272690.png)

# Configuracoes da Extensao

Apos a instalacao definir as seguintes configuracoes:

Via configuraoes graficas:

![graphic_settings_configurations_image](https://user-images.githubusercontent.com/34511940/86622266-00582e00-bf96-11ea-889a-89c004dfd4d8.png)

-----------------------------------------------------------------------------------------------------------

# Motivacoes para o uso da extensao Totvs Coverage Analysis

Hoje temos como funcionalidade nativa TOTVS o [Coverage TOTVS](https://tdn.totvs.com/x/PH6lGw).

Cada Suite de Teste deve ser executada em modo exclusivo, ou seja, cada uma tera no final de sua execucao os arquivos:
* coverlocal_cover.csv: apresenta o total de linhas válidas do fonte, quantidade de linhas cobertas (passou), quantidade de linhas não cobertas (não passou) e % de cobertura em cada fonte;

* coverlocal_testcase.csv: apresenta as linhas válidas do fonte e, se cobertas, detalha todos os casos de testes que passaram pela linha. Caso seja do TIR ou teste manual, o detalhe será o identificador do parâmetro "Suite" do appserver.ini.

Imagine executar diversos Suites de Teste, e ter que analisar manualmente o percentual de cobertura de determinado fonte.

![coverage_files_image](https://user-images.githubusercontent.com/34511940/86967804-85337b00-c141-11ea-84b9-dc770787afea.png)

Logo teremos que consolidar todas informacoes quanto a linhas cobertas ou nao, por fonte(Ex: FISA001.PRW > 17 Mil linhas), entre todos os arquivos(.csv) de cada Suite de Teste. 

Neste momento, voce ja percebeu que tera que levar em consideracao em seu calculo, linhas que em um certo arquivo de coverage estarao cobertas e em outros nao.

![compare_lines_image](https://user-images.githubusercontent.com/34511940/86617230-5379b300-bf8d-11ea-9f58-d8ce46475683.png)


Para atuarmos na gestao, analise ou trabalho de alcancar uma determinada meta de automacao, no minimo, teriamos os seguintes questoes a serem respondidas:
    
* Qual o percentual de cobertura total por fonte entre todos os arquivos(.csv) de coverage?
            
        R: Consolidacao(Merge) das linhas cobertas, eliminando as repetidas.
    
* Quais sao realmente as linhas nao cobertas, por fonte?
        
        R: Consolidacao(Merge) das linhas nao cobertas de cada arquivo(.csv) de coverage, eliminando as repetidas.

E Voilà, vamos analisar as linhas nao cobertas para criar os novos casos de teste e aumentar o percentual de cobertura de um fonte especifico:

Quanto as linhas sem cobertura:

* Como saber quais funcoes de determinado fonte, tem menor cobertura?
  
        R: Para cada linha nao coberta, devo analisar o fonte(Ex: FISA001.PRW) e levantar em qual funcao ela se encontra.

* Como determinar quais sao as funcoes do fonte com menor percentual de cobertura?
  
        R: Somar a quantidade de linhas nao cobertas por funcao, para determinar se ha cobertura parcial ou total da mesma. Ordenar por funçao com mais linhas sem cobertura.


## Release Notes

### 1.0.0

-----------------------------------------------------------------------------------------------------------

### For more information

* [GitHub](https://github.com/ShinyDataScience/Vs_Code_Extensions/tree/master/TotvsCoverageAnalysis)
* E-mail - thiagoyoshiaki@gmail.com

**Enjoy!**
