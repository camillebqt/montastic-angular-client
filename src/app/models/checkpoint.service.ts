import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError as observableThrowError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Checkpoint } from './checkpoint';

@Injectable()
export class CheckpointService {
  private CheckpointUrl = 'https://app.bamzoogle.com/workspaces/JK6PWOCMNL7ISQZ/teams';

  constructor(private http: HttpClient) {}

  getCheckpoints() {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST',
      'X-API-KEY': 'd4942cc2205c473abda2bfc4b7e884768229d73262384d4aad75f6ca262e9037', Accept: 'application/json',
      'Content-Type': 'application/json'});
    return this.http
      .get<Checkpoint[]>(this.CheckpointUrl, {
        headers
      })
      .pipe(map(data => data), catchError(this.handleError));

/*    return this.http
      .get<Checkpoint[]>(this.CheckpointUrl)
      .pipe(map(data => data), catchError(this.handleError));*/
  }

  getCheckpoint(id: number): Observable<Checkpoint> {
    return this.getCheckpoints().pipe(
      map(checkpoints => checkpoints.find(checkpoint => checkpoint.id === id))
    );
  }

  save(checkpoint: Checkpoint) {
    if (checkpoint.id) {
      return this.put(checkpoint);
    }
    return this.post(checkpoint);
  }

/*  delete(checkpoint: Checkpoint) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.CheckpointUrl}/${checkpoint.id}`;

    return this.http.delete<Checkpoint>(url).pipe(catchError(this.handleError));
  }*/

  // Add new Checkpoint
  private post(checkpoint: Checkpoint) {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST',
      'X-API-KEY': 'd4942cc2205c473abda2bfc4b7e884768229d73262384d4aad75f6ca262e9037', Accept: 'application/json',
      'Content-type': 'application/json'});
      // 'Content-Type': 'application/json'
    return this.http
      .post<Checkpoint>(this.CheckpointUrl, checkpoint, {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  // Update existing Checkpoint
  private put(checkpoint: Checkpoint) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.CheckpointUrl}/${checkpoint.id}`;

    return this.http.put<Checkpoint>(url, checkpoint).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
