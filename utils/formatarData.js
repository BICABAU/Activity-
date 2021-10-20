const { parseISO, format } = require('date-fns')
const pt = require('date-fns/locale/pt');

exports.formatarData = (data) => {

  // Passando uma 'string' pro formato de DATA do js
  const dataNaoFormatada = parseISO(data)

  // Formatando a data de acordo com o idioma portugues
  const dataFormatada = format(
    dataNaoFormatada,
    " dd '/' MM '/' yyyy",
    { locale: pt }
  )

  return dataFormatada;
}

exports.formatarDuasDatas = (datas = []) => {
  const datasNaoFormatadas = datas.map(data => parseISO(data))

  const [primeiraDataFormatada, ultimaDataFormatada] = datasNaoFormatadas.map(data => {
    return format(
      data,
      " dd '/' MM '/' yyyy",
      { locale: pt }
    )
  })

  // NAO APAGAR ESSE CODIGO
  // const [primeiraData, ultimaData] = datas;

  // const primeiraDataNaoFormatada = parseISO(primeiraData)
  // const ultimaDataNaoFormatada = parseISO(ultimaData)


  // const primeiraDataFormatada = format(
  //   primeiraDataNaoFormatada,
  //   dataNaoFormatada,
  //   " dd '/' MM '/' yyyy",
  //   { locale: pt }
  // )

  // const ultimaDataFormatada = format(
  //   ultimaDataNaoFormatada,
  //   dataNaoFormatada,
  //   " dd '/' MM '/' yyyy",
  //   { locale: pt }
  // )

  const dataFinal = {
    dataInicioAtividade: primeiraDataFormatada,
    dataFinalAtividade: ultimaDataFormatada
  }

  return dataFinal
}