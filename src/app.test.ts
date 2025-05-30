// process.argv = ['node', 'app.ts', '-b', '10'];
// import './app';
import { ServerApp } from './presentation/server-app';


describe('/App.ts', () => {

    test('should call ServerApp.run() with values', async() => {

        const serverAppRunMock = jest.fn();
        ServerApp.run = serverAppRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination'];

        await import('./app');

        expect( serverAppRunMock ).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            show: true,
            name: 'test-file',
            destination: 'test-destination'
        });

    })

})