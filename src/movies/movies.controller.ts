import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie.entity'
import { CreateMovieDto } from './dto/create-moive.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService){

    }

    @Get()
    getAll():Movie[]{
        return this.movieService.getAll();
    }

    @Get("search")
    search(@Query('name') searchingName:string){
        return `search for a movie ${searchingName}`;
    }

    @Get(":id")
    getOne(@Param('id') id:number):Movie{
        console.log(typeof id);
        return this.movieService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.movieService.create(movieData);
    }

    @Delete(':id')
    delete(@Param('id') id:number){
        return this.movieService.deleteOne(id);
    }

    @Patch(':id')
    patch(@Param('id') id:number, @Body() upData:UpdateMovieDto){
        return this.movieService.update(id, upData)
    }
}
