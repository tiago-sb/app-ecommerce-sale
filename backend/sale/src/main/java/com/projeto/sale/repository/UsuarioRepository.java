package com.projeto.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.sale.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Usuario findByLogin(String login);
	boolean existsByLogin(String login);
}

