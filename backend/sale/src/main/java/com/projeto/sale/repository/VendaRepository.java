package com.projeto.sale.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;

import com.projeto.sale.model.Venda;
import com.projeto.sale.DTO.venda.ProdutoMaisVendidoDTO;
import com.projeto.sale.DTO.venda.ProdutoPorMesDTO;

public interface VendaRepository extends JpaRepository<Venda, Long> {
	@Query("SELECT SUM(v.custo) FROM Venda v")
	BigDecimal faturamento();

	@Query("""
			SELECT SUM(v.custo)
			FROM Venda v
			WHERE YEAR(v.data) = YEAR(CURRENT_DATE)
			AND MONTH(v.data) = MONTH(CURRENT_DATE)
			""")
	BigDecimal faturamentoMes();

	@Query("""
			SELECT new com.projeto.sale.DTO.venda.ProdutoMaisVendidoDTO(
			    v.produto.nome,
			    COUNT(v)
			)
			FROM Venda v
			GROUP BY v.produto.nome
			ORDER BY COUNT(v) DESC
			""")
	List<ProdutoMaisVendidoDTO> produtosMaisVendidos(Pageable pageable);

	@Query("""
			SELECT new com.projeto.sale.DTO.venda.ProdutoPorMesDTO(
			    COUNT(v),
			    SUM(v.custo),
			    YEAR(v.data),
			    MONTH(v.data)
			)
			FROM Venda v
			GROUP BY YEAR(v.data), MONTH(v.data)
			ORDER BY YEAR(v.data), MONTH(v.data)
			""")
	List<ProdutoPorMesDTO> vendasPorMes();
}
