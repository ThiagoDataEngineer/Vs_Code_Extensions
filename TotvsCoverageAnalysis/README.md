# Totvs Coverage Analysis

Bem vindo a extensao para analise de dados resultantes do Coverage de fontes TOTVS. [Totvs Coverage Analysis](https://github.com/ShinyDataScience/Vs_Code_Extensions/tree/master/TotvsCoverageAnalysis)

Suporte para analise de dados resultantes do Coverage de fontes TOTVS.

Essa extensao analisa e extrai os dados que realmente importam, entre diversos arquivos de coverage gerados.

* Totalizador de resultados do percentual de cobertura:

![total_results_image](https://user-images.githubusercontent.com/34511940/86618898-0c40f180-bf90-11ea-99ee-9517def01632.png)

* Analises por fonte das linhas não cobertas, trazendo informacoes como, identificacao da funcao a qual a linha pertence, priorizacao das funcoes menos cobertas e identifiacao caso a funcao inteira esteja sem cobertura:

![blank_lines_principal_counts_image](https://user-images.githubusercontent.com/34511940/86619135-62ae3000-bf90-11ea-9092-fde196c3b590.png)


# Motivacoes para o uso da extensao Totvs Coverage Analysis

Imagine executar diversos Suits de Teste e ter que analisar manualmente o percentual de cobertura de determinado fonte.

    R: Para isso temos o [Coverage TOTVS](https://tdn.totvs.com/x/PH6lGw) .

Cada Suite de Teste deve ser executada em modo exclusivo, ou seja, cada uma tera no final de sua execucao os arquivos coverlocal_cover.csv e coverlocal_testcase.csv.

![coverage_files_image](https://user-images.githubusercontent.com/34511940/86620937-a9515980-bf93-11ea-94d1-031e829c5b79.png)

Logo teremos que consolidar todas informacoes quanto a linhas cobertas ou nao, por fonte(Ex:FISA001 > 17 Mil linhas), entre diversos arquivos de coverage de cada Suit de Teste. 

Neste momento voce ja percebeu que tera que levar em consideracao em seu calculo linhas que em um certo arquivo de coverage estaram cobertas e em outros nao.

![compare_lines_image](https://user-images.githubusercontent.com/34511940/86617230-5379b300-bf8d-11ea-9f58-d8ce46475683.png)


Para atuarmos na gestao, analise ou trabalho de alcancar uma determinada meta de automacao, no minimo, teriamos os seguintes passos a serem executados:
    
* Qual o percentual de cobertura total por fonte entre todos os arquivo(.csv) de coverage?
            
        R: Consolidacao(Merge) das linhas cobertas, eliminando as repetidas.
    
* Quais sao realmente as linhas nao cobertas, por fonte?
        
        R: Consolidacao(Merge) das linhas nao cobertas de cada arquivo(.csv) de coverage, eliminando as repetidas.

E Voila, vamos analisar as linhasnao cobertas para criar os novos casos de teste e aumentar o percentual de cobertura de um fonte especifico:

* Como saber em qual funçao de determinado fonte aquela linha sem cobertura se encontra?
  
        R: Para cada linha nao coberta, devo analisar o fonte(Ex: SPEDXFUN) e levantar em qual funçao ela se encontra.

* Como determinar quais funções tem menos percentual de cobertura?
  
        R: Somar a quantidade de linhas nao cobertas por funcao, para determinar se há cobertura parcial ou total da mesma. Ordenar por funçao com mais linhas sem cobertura.


# Configuracoes da Extensao

Apos a instalacao definir as seguintes configuracoes:

Via configuraoes graficas:

![graphic_settings_configurations_image](https://user-images.githubusercontent.com/34511940/86622266-00582e00-bf96-11ea-889a-89c004dfd4d8.png)


Via settings.json:

![manual_settings_configurations_image](https://user-images.githubusercontent.com/34511940/86619686-71e1ad80-bf91-11ea-927f-b08f2927d3a5.png)


## Release Notes

### 1.0.0

-----------------------------------------------------------------------------------------------------------

### For more information

* [GitHub](https://github.com/ShinyDataScience/Vs_Code_Extensions/tree/master/TotvsCoverageAnalysis)
* E-mail - thiagoyoshiaki@gmail.com

**Enjoy!**
