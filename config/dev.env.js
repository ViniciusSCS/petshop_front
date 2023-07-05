'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGIN_ERRO: '"Nome de usuário ou senha incorretos. Por favor tente novamente!"',
  PET_CADASTRADO_SUCESSO: '"Pet cadastrado com sucesso!"',
  PET_ATUALIZADO_SUCESSO: '"Pet atualizado com sucesso!"',
  PET_CADASTRADO_ERRO: '"Erro ao cadastrar pet!"',
})
