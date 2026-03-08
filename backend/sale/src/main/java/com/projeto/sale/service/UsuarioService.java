package com.projeto.sale.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projeto.sale.DTO.usuario.DadosCadastroUsuarioDTO;
import com.projeto.sale.DTO.usuario.DadosDetalhamentoUsuarioDTO;
import com.projeto.sale.model.Usuario;
import com.projeto.sale.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	public Usuario cadastrar(DadosCadastroUsuarioDTO dados)  {
		if(usuarioRepository.existsByLogin(dados.login())) {
			throw new IllegalArgumentException("Usuário Cadastrado.");
		}
		
		var usuario = new Usuario();
		
		usuario.setLogin(dados.login());
		usuario.setNome(dados.nome());
		usuario.setSenha(passwordEncoder.encode(dados.senha()));
			
		return usuarioRepository.save(usuario);
	}
	
	public List<DadosDetalhamentoUsuarioDTO> listar() {
	    return usuarioRepository.findAll()
	            .stream()
	            .map(usuario -> new DadosDetalhamentoUsuarioDTO(
	                    usuario.getLogin(),
	                    usuario.getNome()
	            ))
	            .toList();
	}
}
