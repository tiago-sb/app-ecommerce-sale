package com.projeto.sale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projeto.sale.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	boolean existsByNome(String nome);
	List<Produto> findByNomeContainingIgnoreCase(String nome);
	
	@Query("SELECT SUM(p.estoqueAtual) FROM Produto p")
	Integer totalEstoque();
	
	@Query("SELECT COUNT(p) FROM Produto p WHERE p.estoqueAtual <= p.estoqueMinimo")
	Integer estoqueBaixo();
}
