
export interface CreateTableUseCase {
    execute: ( options:CreateTableOptions ) => string;
}
export interface CreateTableOptions {
    base: number,
    limit?: number,
}


export class CreateTable implements CreateTableUseCase { 

    constructor(){}

    execute({ base, limit = 10 }:CreateTableOptions){

        let data = '';

        for (let i = 1; i <= limit; i++) {
            data += (`${ base } x ${ i } = ${ base * i }\n`);
        }

        return data;
    }

}