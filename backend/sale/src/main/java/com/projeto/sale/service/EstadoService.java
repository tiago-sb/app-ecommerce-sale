package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.estado.DadosAtualizacaoEstadoDTO;
import com.projeto.sale.DTO.estado.DadosCadastroEstadoDTO;
import com.projeto.sale.DTO.estado.DadosDetalhamentoEstadoDTO;
import com.projeto.sale.model.Estado;
import com.projeto.sale.repository.EstadoRepository;

import jakarta.transaction.Transactional;

@Service
public class EstadoService {

	@Autowired
	private EstadoRepository estadoRepository;

	@Transactional
	public Estado cadastrar(DadosCadastroEstadoDTO dados) {
		if (estadoRepository.existsBySigla(dados.sigla())) {
			throw new IllegalArgumentException("Já Existe um Estado com Essa Sigla.");
		}

		var estado = new Estado();
		estado.setNome(dados.nome());
		estado.setSigla(dados.sigla());

		return estadoRepository.save(estado);
	}

	@Transactional
	public List<DadosDetalhamentoEstadoDTO> listar() {
		return estadoRepository.findAll().stream()
				.map(estado -> new DadosDetalhamentoEstadoDTO(estado.getId(), estado.getNome(), estado.getSigla()))
				.toList();
	}

	@Transactional
	public DadosDetalhamentoEstadoDTO alterar(Long id, DadosAtualizacaoEstadoDTO estadoNovo) throws Exception {
		var estado = estadoRepository.findById(id).orElseThrow(() -> new Exception("Estado não encontrado"));

		if (estadoRepository.existsBySigla(estadoNovo.sigla())) {
			throw new Exception("Já existe estado com essa sigla");
		}

		estado.setNome(estadoNovo.nome());
		estado.setSigla(estadoNovo.sigla());

		return new DadosDetalhamentoEstadoDTO(estado.getId(), estado.getNome(), estado.getSigla());
	}
	
	@Transactional
	public void deletar(Long id) {
	    if (!estadoRepository.existsById(id)) {
	        throw new RuntimeException("Estado não Encontrado");
	    }

	    estadoRepository.deleteById(id);
	}
}
