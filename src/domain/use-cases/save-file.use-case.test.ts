import { SaveFile } from "./save-file.use-case";
import fs from 'fs';



describe('save-file.use-case', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach( () => {

        const pathOutputs = 'outputs';
        const pathCustomOutputs = 'custom-outputs/file-destination';

        const pathOutputsExists = fs.existsSync( pathOutputs );
        const pathCustomExist = fs.existsSync( pathCustomOutputs );

        if(pathOutputsExists) fs.rmSync('outputs', { recursive: true });
        if(pathCustomExist) fs.rmSync('custom-outputs', { recursive: true });
    });//limpio


    test('SaveFile should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        } //argumentos del execute: fileContent, fileDestination?, fileName?

        const result = saveFile.execute( options ); 
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );

    });


    test('SaveFile should save file with custom values', () => {
       
        const saveFile = new SaveFile();
        const result = saveFile.execute( customOptions );

        const fileExists = fs.existsSync( customFilePath );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8' } );

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( customOptions.fileContent );

    });


    test('SaveFile should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn( fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing (directory creation)') 
        });

        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );
        
        mkdirSpy.mockRestore();
    })


    test('SaveFile should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn( fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing (file creation)') 
        });

        const result = saveFile.execute( customOptions );

        expect( result ).toBe( false );
        
        writeFileSpy.mockRestore();
    })

})