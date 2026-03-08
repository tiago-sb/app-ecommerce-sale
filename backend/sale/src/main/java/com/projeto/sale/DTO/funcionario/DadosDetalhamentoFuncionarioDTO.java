package com.projeto.sale.DTO.funcionario;

import com.projeto.sale.model.Perfil;

public record DadosDetalhamentoFuncionarioDTO(Long id, String nome, String cpf, String funcao, Perfil perfil) {

}
