package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.cliente.DadosAlterarClienteDTO;
import com.projeto.sale.DTO.cliente.DadosCadastrarClienteDTO;
import com.projeto.sale.DTO.cliente.DadosDetalhamentoClienteDTO;
import com.projeto.sale.model.Cliente;
import com.projeto.sale.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	@Transactional
	public Cliente cadastrar(DadosCadastrarClienteDTO dados) {
		if (clienteRepository.existsByNome(dados.nome())) {
			throw new IllegalArgumentException("Cliente Cadastrado.");
		}

		var cliente = new Cliente();
		cliente.setNome(dados.nome());
		cliente.setCpf(dados.cpf());
		cliente.setEmail(dados.email());
		cliente.setTelefone(dados.telefone());
		cliente.setCidade(dados.cidade());

		return clienteRepository.save(cliente);
	}

	@Transactional
	public DadosDetalhamentoClienteDTO alterar(Long id, DadosAlterarClienteDTO dados) throws Exception {
		var cliente = clienteRepository.findById(id).orElseThrow(() -> new Exception("Cliente não Encontrado."));

		cliente.setNome(dados.nome());
		cliente.setCpf(dados.cpf());
		cliente.setEmail(dados.email());
		cliente.setTelefone(dados.telefone());
		cliente.setCidade(dados.cidade());

		return new DadosDetalhamentoClienteDTO(cliente.getId(), cliente.getNome(), cliente.getCpf(), cliente.getEmail(),
				cliente.getTelefone(), cliente.getCidade());
	}

	@Transactional
	public void deletar(Long id) {
		clienteRepository.deleteById(id);
	}

	@Transactional
	public List<DadosDetalhamentoClienteDTO> listar() {
		return clienteRepository.findAll().stream().map(cliente -> new DadosDetalhamentoClienteDTO(cliente.getId(),
				cliente.getNome(), cliente.getCpf(), cliente.getEmail(), cliente.getTelefone(), cliente.getCidade()))
				.toList();
	}
}
