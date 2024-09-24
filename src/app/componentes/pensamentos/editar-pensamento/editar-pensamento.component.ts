import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { Pensamento } from '../pensamento/pensamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidators } from '../validacoes/minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(3),
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidators
      ])],
      modelo: ['modelo1']
    })
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  editarPensamento(){
    if(this.formulario.valid) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
