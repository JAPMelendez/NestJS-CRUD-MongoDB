import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Book } from "./schema/book.schema";
import { BookService } from "./books.service";

@ApiTags('Books')
@Controller('books')
export class BookController{
    constructor (private readonly bookService: BookService){}

    @ApiCreatedResponse({type: Book, description:'Book Creation'})
    @ApiBadRequestResponse()
    @Post('create')
    async createBook(@Res() response, @Body() book: Book){
        const newBook = await this.bookService.create(book);
        return response.status(HttpStatus.OK).json({
            newBook
        })
    }
    @ApiOkResponse({type: Book, description: 'Get all books'})
    @ApiNotFoundResponse()
    @Get('all')
    async fetchAll(@Res() response){
        const books = await this.bookService.readAll();
        return response.status(HttpStatus.OK).json({
            books
        })
    }

    @ApiOkResponse({type: Book, description: 'Search by Id book'})
    @ApiNotFoundResponse()
    @Post('/:id')
    async findById(@Res() response, @Param('id') id: string){
        const book = await this.bookService.readById(id);
        return response.status(HttpStatus.OK).json({
            'Book Id': book 
        })
    }

    @ApiCreatedResponse({type: Book, description: 'Update by Id book'})
    @ApiBadRequestResponse()
    @Put('update/:id')
    async update(@Res() response, @Param('id') id:string, @Body() book: Book){
        const updateBook = await this.bookService.update(id, book);
        return response.status(HttpStatus.OK).json({
            updateBook: 'Book Updated'
        })
    }

    @ApiCreatedResponse({type: Book, description: 'Delete by Id book'})
    @ApiBadRequestResponse()
    @Delete('delete/:id')
    async delete(@Res() response, @Param('id') id: string){
        const deleteBook = await this.bookService.delete(id);
        return response.status(HttpStatus.OK).json({
            deleteBook:'book deleted'
        })
    }
}