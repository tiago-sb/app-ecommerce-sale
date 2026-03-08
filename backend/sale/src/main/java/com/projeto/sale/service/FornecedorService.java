package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.fornecedor.DadosAlterarFornecedorDTO;
import com.projeto.sale.DTO.fornecedor.DadosCadastroFornecedorDTO;
import com.projeto.sale.DTO.fornecedor.DadosDetalhamentoFornecedorDTO;
import com.projeto.sale.model.Fornecedor;
import com.projeto.sale.repository.FornecedorRepository;

import jakarta.transaction.Transactional;

@Service
public class FornecedorService {

	@Autowired
	private FornecedorRepository fornecedorRepository;

	@Transactional
	public Fornecedor cadastrar(DadosCadastroFornecedorDTO dados) {
		if (fornecedorRepository.existsByNome(dados.nome())) {
			throw new IllegalArgumentException("Fornecedor Cadastrado.");
		}

		var fornecedor = new Fornecedor();

		fornecedor.setNome(dados.nome());
		fornecedor.setCnpj(dados.cnpj());
		fornecedor.setContato(dados.contato());
		fornecedor.setCidade(dados.cidade());

		return fornecedorRepository.save(fornecedor);
	}

	@Transactional
	public DadosDetalhamentoFornecedorDTO alterar(Long id, DadosAlterarFornecedorDTO dados) throws Exception {
		var fornecedor = fornecedorRepository.findById(id)
				.orElseThrow(() -> new Exception("Fornecedor não Encontrado."));

		fornecedor.setNome(dados.nome());
		fornecedor.setCnpj(dados.cnpj());
		fornecedor.setContato(dados.contato());
		fornecedor.setCidade(dados.cidade());

		return new DadosDetalhamentoFornecedorDTO(id, fornecedor.getNome(), fornecedor.getCnpj(),
				fornecedor.getContato(), fornecedor.getCidade());
	}

	@Transactional
	public void deletar(Long id) {
		if (!fornecedorRepository.existsById(id)) {
			throw new RuntimeException("Fornecedor não Encontrado");
		}

		fornecedorRepository.deleteById(id);
	}

	@Transactional
	public List<DadosDetalhamentoFornecedorDTO> listar() {
		return fornecedorRepository
				.findAll().stream().map(fornecedor -> new DadosDetalhamentoFornecedorDTO(fornecedor.getId(),
						fornecedor.getNome(), fornecedor.getCnpj(), fornecedor.getContato(), fornecedor.getCidade()))
				.toList();
	}
}
