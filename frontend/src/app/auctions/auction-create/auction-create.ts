import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auction-create.html',
  styleUrls: ['./auction-create.css']
})
export class AuctionCreateComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auctionService: AuctionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startingPrice: [0, [Validators.required, Validators.min(1)]],
      endTime: ['', [Validators.required]]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    this.auctionService.create(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/auctions']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = 'שגיאה ביצירת מכירה';
      }
    });
  }
}