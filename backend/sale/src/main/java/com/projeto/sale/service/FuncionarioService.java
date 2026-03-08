package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.funcionario.DadosDetalhamentoFuncionarioDTO;
import com.projeto.sale.DTO.funcionario.DadosAlterarFuncionarioDTO;
import com.projeto.sale.DTO.funcionario.DadosCadastrarFuncionarioDTO;
import com.projeto.sale.model.Funcionario;
import com.projeto.sale.repository.FuncionarioRepository;

import jakarta.transaction.Transactional;

@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Transactional
	public Funcionario cadastrar(DadosCadastrarFuncionarioDTO dados) {
		if (funcionarioRepository.existsByCpf(dados.cpf())) {
			throw new IllegalArgumentException("Funcionário Cadastrado.");
		}

		var funcionario = new Funcionario();
		funcionario.setNome(dados.nome());
		funcionario.setCpf(dados.cpf());
		funcionario.setFuncao(dados.funcao());
		funcionario.setPerfil(dados.perfil());

		return funcionarioRepository.save(funcionario);
	}

	@Transactional
	public DadosDetalhamentoFuncionarioDTO alterar(Long id, DadosAlterarFuncionarioDTO dados) throws Exception {
		var funcionario = funcionarioRepository.findById(id)
				.orElseThrow(() -> new Exception("Funcionário não Existe na Base de Dados."));

		funcionario.setNome(dados.nome());
		funcionario.setCpf(dados.cpf());
		funcionario.setFuncao(dados.funcao());
		funcionario.setPerfil(dados.perfil());

		return new DadosDetalhamentoFuncionarioDTO(id, funcionario.getNome(), funcionario.getCpf(),
				funcionario.getFuncao(), funcionario.getPerfil());
	}

	@Transactional
	public void deletar(Long id) {
		funcionarioRepository.deleteById(id);
	}

	@Transactional
	public List<DadosDetalhamentoFuncionarioDTO> listar() {
		return funcionarioRepository
				.findAll().stream().map(funcionario -> new DadosDetalhamentoFuncionarioDTO(funcionario.getId(),
						funcionario.getNome(), funcionario.getCpf(), funcionario.getFuncao(), funcionario.getPerfil()))
				.toList();
	}
}
