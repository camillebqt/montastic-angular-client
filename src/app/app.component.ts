import {Component, OnInit} from '@angular/core';
import {CheckpointService} from './Checkpoint.service';
import {Checkpoint} from './Checkpoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  id: number;
  title = 'montastic';
  private check: Checkpoint;
  checkpoints: Checkpoint[];
  error: any;
  constructor(private checkpointService: CheckpointService) {
    checkpointService.getCheckpoints().subscribe(res => {
      console.log(res);
    });
    checkpointService.post(this.check).subscribe(res => {
      console.log(res);
    });
  }
  addCheckpoints() {
    this.checkpointService
      .post(this.check)
      .subscribe(
        checkpoints => (this.checkpoints),
        error => (this.error = error)
      );
  }
  ngOnInit(): void {
    this.addCheckpoints();
  }
}
