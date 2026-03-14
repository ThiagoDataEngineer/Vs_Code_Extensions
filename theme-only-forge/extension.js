const vscode = require('vscode');

const GROUPS = [
  {
    label: 'Santander',
    themes: [
      'Santander Dark',
      'Santander Neon Black',
      'Santander Light'
    ]
  },
  {
    label: 'COBOL Mainframe',
    themes: [
      'COBOL Mainframe Dark',
      'COBOL Mainframe Light'
    ]
  }
];

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'worldBankingThemes.selectThemeBySubgroup',
    async () => {
      const items = [];

      for (const group of GROUPS) {
        items.push({ kind: vscode.QuickPickItemKind.Separator, label: group.label });
        for (const theme of group.themes) {
          items.push({ label: theme, description: 'Bank-inspired color palette' });
        }
      }

      const picked = await vscode.window.showQuickPick(items, {
        title: 'Themes by Subgroup',
        placeHolder: 'Select a theme'
      });

      if (!picked || picked.kind === vscode.QuickPickItemKind.Separator) return;

      await vscode.workspace.getConfiguration('workbench').update('colorTheme', picked.label, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`Theme applied: ${picked.label}`);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };