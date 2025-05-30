import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from "./server-app"


describe('server-app.ts', () => {
    
    const customOptions = {
        base: 5,
        limit: 5,
        show: true,
        name: 'custom-table',
        destination: 'custom-destination'
    }

    beforeEach( () => {
        jest.clearAllMocks();
    })

    test('should create ServerApp instance', () =>{

        const serverApp = new ServerApp();

        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe('function');

    })


    test('should run ServerApp with options', () =>{

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

        ServerApp.run( customOptions );

        //console.log()
        expect( logSpy ).toHaveBeenCalledTimes(3);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenLastCalledWith(`File ${ customOptions.name } was created!`);

        // CreateTable().execute()
        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
          base: customOptions.base,
          limit: customOptions.limit
        });

        // SaveFile().execute()
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
          fileContent: expect.any(String),
          fileDestination: customOptions.destination,
          fileName: customOptions.name
        });

    })


    test('should run with values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('5 x 1 = 5'); //fileContent
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run( customOptions );

        expect( logMock ).toHaveBeenCalledWith('Server running...');
        expect( createTableMock ).toHaveBeenCalledWith({ base: customOptions.base , limit: customOptions.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({ 
            fileContent: '5 x 1 = 5',
            fileDestination: customOptions.destination,
            fileName: customOptions.name
        })

        expect( logMock ).toHaveBeenCalledWith(`File ${ customOptions.name } was created!`);
        //expect( logErrorMock ).not.toHaveBeenCalledWith();

    })
})