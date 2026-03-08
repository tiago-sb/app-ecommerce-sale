package com.projeto.sale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.sale.DTO.autenticacao.CadastroRespostaDTO;
import com.projeto.sale.DTO.autenticacao.DadosLoginDTO;
import com.projeto.sale.DTO.autenticacao.DadosTokenDTO;
import com.projeto.sale.DTO.usuario.DadosCadastroUsuarioDTO;
import com.projeto.sale.DTO.usuario.DadosDetalhamentoUsuarioDTO;
import com.projeto.sale.service.JwtService;
import com.projeto.sale.service.UsuarioService;

@RestController
@RequestMapping
public class UsuarioController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UsuarioService usuarioService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody DadosLoginDTO request) {

		var authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.login(), request.senha()));

		var userDetails = (UserDetails) authentication.getPrincipal();

		var token = jwtService.gerarToken(userDetails);

		return ResponseEntity.ok(new DadosTokenDTO(token));
	}

	@PostMapping("usuario/cadastrar")
	public ResponseEntity<?> cadastrar(@RequestBody @Validated DadosCadastroUsuarioDTO request) {
		var usuario = usuarioService.cadastrar(request);
		var token = jwtService.gerarToken((UserDetails) usuario);

		var resposta = new CadastroRespostaDTO(usuario.getLogin(), token);

		return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
	}
	
	@GetMapping("usuario/usuarios")
	public ResponseEntity<List<DadosDetalhamentoUsuarioDTO>> listar(){
	    var lista = usuarioService.listar();
	    
	    return ResponseEntity.ok(lista);
	}
}
