// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */



function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated


	console.log('Using Cornell schema for notes!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('caca.cornell', function () {

		// Adding Cornell Structure defined in CSS using markdown-it-container syntax

		let str = "::::: cornell-method \n :::: notes-summary \n \#\#\# Summary \n\n<!-----------------summary starts-------------------> \n\n<!------------------summary ends-------------------->\n::::\n\n:::: case-notes \n::: comments \n ### Comments \n\n<!----------------comments starts------------------>\n\n<!-----------------comments ends------------------->\n\n:::\n::: action-items \n ### Keywords Questions \n\n<!----------------keywords starts------------------> \n\n<!-----------------keywords ends-------------------> \n\n ### Action Items \n\n<!--------------action items starts----------------> \n\n<!---------------action items ends----------------->\n\n::: \n:::: \n:::::\n\n";

		// Bulding an editor to insert the above text in the current active selection or cursor.
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(editBuilder => {
				// An arrow function expression for inserting
				editBuilder.insert(editor.selection.active, str)
			});
		}


		// Display a message box to the user
		vscode.window.showInformationMessage('Cornell schema inserted!');
	});
	
	// Command for inserting references with a Unique ID at the END of a Markdown document
	// 0. Place text cursor in the Reference-desired section.
	// 1. Ctrl+c in Browner for copying a URL/ID/resource name
	// 2. Ctrl+Shift+P then 'Insert Cornell Reference'
	// 3. Add a convenient title or let it empty. Then hit ENTER.

	let disposable2 = vscode.commands.registerCommand('caca.reference', function() {

		let selectedText;
		// Using a Thenable for getting the Text from the clipboard.
		vscode.env.clipboard.readText().then((text)=> {
			selectedText = text
			console.log(`Selected Text: ${selectedText}`)


			
			const editor2 = vscode.window.activeTextEditor;
			vscode.window.showInputBox({placeHolder: "Insert a cool title"}).then((text)=> {
				const title = text;
				console.log(`Title: ${title}`);


				if (selectedText){
					// Creating a random/unique bib id from a random seed and current EPOCH time
					var random = Math.random();
					var now = new Date().getTime();
					var randomBibIndex = Math.floor(random * now).toString(36);
					console.log('Random Bib Index:', randomBibIndex );

					
					let formattedText = `[^${randomBibIndex}]`;
					let referenceText;

					if (title) {
						referenceText = `[^${randomBibIndex}]: (${selectedText}, "${title}") `;
					}
					else {
						referenceText = `[^${randomBibIndex}]: ${selectedText} `;

					}
		
					const numOfLines = editor2.document.lineCount;
					console.log(`Insterting at: ${numOfLines}+1, ${referenceText}`);
					const editor3 = vscode.window.activeTextEditor;
					editor3.edit(editBuilder => {
						editBuilder.replace(editor2.selection.active, formattedText);
						editBuilder.insert(new vscode.Position(numOfLines+1, 0), referenceText);
					});

	
					// Display a message box to the user
					vscode.window.showInformationMessage(`Documentation Reference created for: ${selectedText}`);
		
		
				}

			});



		});


		



	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
