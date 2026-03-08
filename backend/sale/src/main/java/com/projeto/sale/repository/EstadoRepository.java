package com.projeto.sale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.sale.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
	boolean existsBySigla(String sigla);
	Optional<Estado> findById(String sigla);	
}
