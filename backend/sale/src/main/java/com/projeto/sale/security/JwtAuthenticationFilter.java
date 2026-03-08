package com.projeto.sale.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.projeto.sale.repository.UsuarioRepository;
import com.projeto.sale.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtService tokenService;
	
	@Autowired
	private UsuarioRepository repository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		var token = recuperarToken(request);
		
		if(token != null) {
			var subject = tokenService.extrairLogin(token);
			var usuario = repository.findByLogin(subject);
			
			var userDetails = new User (
			        usuario.getLogin(),
			        usuario.getSenha(),
			        List.of(new SimpleGrantedAuthority("ROLE_USER"))
			);

			var authentication = new UsernamePasswordAuthenticationToken(
			        userDetails,
			        null,
			        userDetails.getAuthorities()
			);
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response);
	}

	private String recuperarToken(HttpServletRequest request) {
		var autorizationHeader = request.getHeader("Authorization");
		
		if(autorizationHeader != null) return autorizationHeader.replace("Bearer ", "");
		                                                                                                 
		return null;
	}
}