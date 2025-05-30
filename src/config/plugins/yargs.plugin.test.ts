//import { yarg } from "./yargs.plugin"

const runCommand = async( args: string[] ) => {

    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('./yargs.plugin');

    return yarg;
}


describe('yargs.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach( () => {
        process.argv = originalArgv;
        jest.resetModules();
    });//limpio


    test('yargs should return default values', async() => {

        const argv = await runCommand(['-b','5']);

        expect( argv ).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    })


    test('should return configuration with custom values', async() => {

        const argv = await runCommand(['-b','10','-l','5','-s','-n','custom-table','-d','outputs/custom-tables']);
        
        expect( argv ).toEqual(expect.objectContaining({
            b: 10,
            l: 5,
            s: true,
            n: 'custom-table',
            d: 'outputs/custom-tables',
        }));
    })

})