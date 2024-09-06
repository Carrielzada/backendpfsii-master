CREATE DATABASE sistema;

USE sistema;

CREATE TABLE tipo_maquinario(
    tpm_codigo INT NOT NULL AUTO_INCREMENT,
    tpm_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_tipo_maquinario PRIMARY KEY(tpm_codigo)
);

CREATE TABLE maquinario(
    mq_codigo INT NOT NULL AUTO_INCREMENT,
    mq_descricao VARCHAR(100) NOT NULL,
    mq_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    mq_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    mq_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    tpm_codigo INT NOT NULL,
    CONSTRAINT pk_maquinario PRIMARY KEY(mq_codigo),
    CONSTRAINT fk_maquinario_tipo_maquinario FOREIGN KEY (tpm_codigo) REFERENCES tipo_maquinario(tpm_codigo)
);