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

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "totvs-coverage-analysis" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('totvs-coverage-analysis.inittotvscoverage', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
 
		var {PythonShell} = require('python-shell')

		const config = vscode.workspace.getConfiguration("totvs-coverage-analysis");
		const cPath = config.get("PathCover");
		const cPathSources = config.get("PathCoverSources");
				
		if (cPath == '')
			vscode.window.showInformationMessage('Crie a chave totvs-coverage-analysis.PathCover com o diretorio onde se encontram os seus arquivos para analise.');
		else
			if (cPathSources == '') 
				vscode.window.showInformationMessage('Crie a chave totvs-coverage-analysis.PathCoverSources com o diretorio onde se encontram os seus fontes.');
			else
				vscode.window.showInformationMessage('Executando o programa Totvs Coverage Analysis!');
				
				const executablePath = vscode.extensions.getExtension("shinydataanalysis.totvs-coverage-analysis").extensionPath + "\\bin\\Coverage.py";
							
				//PythonShell.run('E:\\ZZ_GitHub\\Data-Analysis-and-Machine-Learning-Projects\\Exercises\\Coverage_Totvs\\Coverage.py', {args: [cPath]}, function (err, results) {	
				PythonShell.run(executablePath, {args: [cPath, cPathSources]}, function (err, results) {	
				if (err) throw err;
					//vscode.window.showInformationMessage('erro ao executar o coverage totvs analysis');		
					//console.log(results);		
				});
				
				console.log('Analise finalizada!!!');
				console.log('*************************************************************************************************************************************');
				console.log('Verifique os resultados no diretorio: ' + cPath);

				vscode.window.showInformationMessage('Verifique os resultados no diretorio: ' + cPath);
		

		//PythonShell.run('E:\\ZZ_GitHub\\Data-Analysis-and-Machine-Learning-Projects\\Exercises\\Coverage_Totvs\\Coverage.py', {args: ['E:\\ZZ_GitHub\\Data-Analysis-and-Machine-Learning-Projects\\Exercises\\Coverage_Totvs\\']}, function (err, results) {
		
		
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
