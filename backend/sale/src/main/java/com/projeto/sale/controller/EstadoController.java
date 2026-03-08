package com.projeto.sale.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

import com.projeto.sale.DTO.estado.DadosAtualizacaoEstadoDTO;
import com.projeto.sale.DTO.estado.DadosCadastroEstadoDTO;
import com.projeto.sale.DTO.estado.DadosDetalhamentoEstadoDTO;
import com.projeto.sale.service.EstadoService;

@RestController
@RequestMapping("/estado")
public class EstadoController {

	@Autowired
	private EstadoService estadoService;

	@PostMapping("/cadastro")
	public ResponseEntity<DadosDetalhamentoEstadoDTO> cadastrar(@RequestBody @Validated DadosCadastroEstadoDTO dados,
			UriComponentsBuilder uriBuilder) {
		var estado = estadoService.cadastrar(dados);

		URI uri = uriBuilder.path("/estado/{id}").buildAndExpand(estado.getId()).toUri();

		return ResponseEntity.created(uri)
				.body(new DadosDetalhamentoEstadoDTO(estado.getId(), estado.getNome(), estado.getSigla()));
	}

	@PutMapping("/alterar/{id}")
	public ResponseEntity<DadosDetalhamentoEstadoDTO> alterar(@PathVariable Long id,
			@RequestBody @Validated DadosAtualizacaoEstadoDTO dados) throws Exception {

		var estadoAtualizado = estadoService.alterar(id, dados);

		return ResponseEntity.ok(estadoAtualizado);
	}

	@DeleteMapping("/deletar/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		estadoService.deletar(id);

		return ResponseEntity.noContent().build();
	}

	@GetMapping("/estados")
	public ResponseEntity<List<DadosDetalhamentoEstadoDTO>> listar() {
		var lista = estadoService.listar();

		return ResponseEntity.ok(lista);
	}
}