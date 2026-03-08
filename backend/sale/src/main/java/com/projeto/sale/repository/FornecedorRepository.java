package com.projeto.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.sale.model.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>{
	boolean existsByNome(String nome);
}
