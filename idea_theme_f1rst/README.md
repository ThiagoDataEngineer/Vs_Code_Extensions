# IDEA Theme F1rst

Tema customizado para IntelliJ IDEA como plugin local.

## Temas incluidos

- Vaporwave Red Neon: base escura com acentos magenta, vermelho e ciano neon.
- Sky Garden (inspiracao ghibli): azul, bege, rosa, vermelho, verde, branco e amarelo em estilo ilustrado suave.
- Cowboy Terminal Black: tela preta com letras verde, branca, amarela e azul em visual terminal retrô.

## Publico alvo

Os esquemas foram calibrados para uso diario de programadores:

- JavaScript e TypeScript
- PySpark e Python
- Scala
- Java
- COBOL
- Shell Script

Cada tema inclui destaque consistente para keywords, strings, numeros, funcoes, classes, variaveis, comentarios e operadores.

Nota sobre icones: para evitar uso de personagens protegidos por direitos autorais, o pacote usa apenas paleta e estilo visual original inspirado, sem personagens oficiais.

## Estrutura

- `src/main/resources/META-INF/plugin.xml`: manifesto do plugin
- `src/main/resources/theme/idea_theme_f1rst.theme.json`: definicao visual do tema
- `scripts/build-theme.ps1`: gera o pacote instalavel em `dist/`

## Como gerar o pacote

No terminal do projeto:

```powershell
./scripts/build-theme.ps1
```

O arquivo final sera criado em `dist/idea-theme-f1rst-0.2.0.zip`.

## Como instalar no IntelliJ

1. Abra IntelliJ IDEA.
2. Va em Settings > Plugins.
3. Clique na engrenagem e escolha Install Plugin from Disk.
4. Selecione o zip em `dist/`.
5. Reinicie o IntelliJ para aplicar o tema.
