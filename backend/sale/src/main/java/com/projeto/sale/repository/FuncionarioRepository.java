package com.projeto.sale.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.sale.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
	boolean existsByCpf(String cpf);
	boolean existsById(Long id);
}
