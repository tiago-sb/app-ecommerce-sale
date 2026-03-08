package com.projeto.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.sale.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	boolean existsByNome(String nome);
}
