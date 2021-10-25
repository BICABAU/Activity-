const { parseISO, format, isValid } = require('date-fns')
const pt = require('date-fns/locale/pt');

exports.formatarData = (data) => {
  var dataNaoFormatada = data;

  if (!isValid(dataNaoFormatada)) {
    // Passando uma 'string' pro formato de DATA do js
    dataNaoFormatada = parseISO(data)
  }

  // Formatando a data de acordo com o idioma portugues
  const dataFormatada = format(
    dataNaoFormatada,
    " dd'/'MM'/'yyyy",
    { locale: pt }
  )

  return dataFormatada;
}

// exports.formatarDuasDatas = (datas = [new Date || new String]) => {
//   var datasNaoFormatadas = datas.map(data => {
//     if (!isValid(data))
//       return parseISO(data)

//     return data
//   })

//   const [primeiraDataFormatada, ultimaDataFormatada] = datasNaoFormatadas.map(data => {
//     return format(
//       datasNaoFormatadas,
//       " dd'/'MM'/'yyyy",
//       { locale: pt }
//     )
//   })

//   // NAO APAGAR ESSE CODIGO
//   // const [primeiraData, ultimaData] = datas;

//   // const primeiraDataNaoFormatada = parseISO(primeiraData)
//   // const ultimaDataNaoFormatada = parseISO(ultimaData)


//   // const primeiraDataFormatada = format(
//   //   primeiraDataNaoFormatada,
//   //   dataNaoFormatada,
//   //   " dd '/' MM '/' yyyy",
//   //   { locale: pt }
//   // )

//   // const ultimaDataFormatada = format(
//   //   ultimaDataNaoFormatada,
//   //   dataNaoFormatada,
//   //   " dd '/' MM '/' yyyy",
//   //   { locale: pt }
//   // )

//   const dataFinal = {
//     dataInicioAtividade: primeiraDataFormatada,
//     dataFinalAtividade: ultimaDataFormatada
//   }

//   return dataFinal
// }