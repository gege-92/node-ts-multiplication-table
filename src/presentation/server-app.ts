import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";


interface RunOptions {
    base: number,
    limit: number,
    show: boolean,
    name: string,
    destination: string
}

export class ServerApp {

    static run( { base, limit, show, name, destination }:RunOptions ){
        console.log('Server running...');

        const table = new CreateTable().execute({base, limit});
        const wasCreated = new SaveFile()
            .execute({ 
                fileContent: table,
                fileDestination: destination,
                fileName: name
            });
            
        if ( show ) console.log( table );

        ( wasCreated )
          ? console.log(`File ${ name } was created!`)
          : console.error('File not created!');
          
    }

}