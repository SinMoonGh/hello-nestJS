import { Injectable, NotFoundException } from '@nestjs/common';
import {Movie} from './entities/Movie.entity';
import { CreateMovieDto } from './dto/create-moive.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll():Movie[]{
        return this.movies;
    }

    getOne(id:number):Movie{
        const movie = this.movies.find(movie => movie.id === +id);
        if(!movie){
            throw new NotFoundException(`Movie ID 존재하지 않음 : ${id}`);
        }
        return movie
    }

    deleteOne(id:number):boolean{
        this.getOne(id);
        this.movies.filter(movie => movie.id ! == +id);
        return true;
    }

    create(movieData:CreateMovieDto):boolean{
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
        return true;
    }

    update(id:number, movieData:UpdateMovieDto):boolean{
        const movie = this.getOne(id)
        movie.title = movieData.title
        movie.year = movieData.year
        movie.genres = movieData.genres
        return true
    }
}
