//import {PythonShell} from 'python-shell';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('totvs-coverage-analysis.inittotvscoverage', function () {

		const config = vscode.workspace.getConfiguration("totvs-coverage-analysis");
		const cPath = config.get("PathCover");
		const cPathSources = config.get("PathCoverSources");
		const cPathResults = config.get("PathCoverResults");
				
		if (cPath == '')
			vscode.window.showInformationMessage('Crie a chave totvs-coverage-analysis.PathCover com o diretorio onde se encontram os seus arquivos para analise.');
		else
			if (cPathSources == '') 
				vscode.window.showInformationMessage('Crie a chave totvs-coverage-analysis.PathCoverSources com o diretorio onde se encontram os seus fontes.');
			else
				vscode.window.showInformationMessage('Executando o programa Totvs Coverage Analysis!');
				
				const executablePath = vscode.extensions.getExtension("shinydataanalysis.totvs-coverage-analysis").extensionPath + "\\bin\\Coverage.py";

				runCoverAnalysis(executablePath, cPath, cPathSources, cPathResults)	

				console.log('Analise finalizada!!!');
				console.log('*************************************************************************************************************************************');
				console.log('Verifique os resultados no diretorio: ' + cPath);

				//vscode.window.showInformationMessage('Verifique os resultados no diretorio: ' + cPath);

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function runCoverAnalysis(executablePath, cPath, cPathSources, cPathResults) {
	
	var {PythonShell} = require('python-shell')

	PythonShell.run(executablePath, {args: [cPath, cPathSources, cPathResults]}, function (err, results) {	
		if (err) throw err;
			vscode.window.showInformationMessage('Verifique os resultados no diretorio: ' + cPath);	;		
		});

}
// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
