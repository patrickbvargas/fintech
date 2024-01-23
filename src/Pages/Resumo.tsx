import GraficoVendas from '../Components/GraficoVendas';
import Loading from '../Components/Loading';
import { useData } from '../Context/DataContext';

const Resumo = () => {
  const { data, loading } = useData();

  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <section>
      <div className="resumo flex mb">
        <div className="box">
          <h2>Vendas</h2>
          <span>
            {data
              .filter((item) => item.status != 'falha')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="box">
          <h2>Recebido</h2>
          <span>
            {data
              .filter((item) => item.status === 'pago')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <div className="box">
          <h2>Processando</h2>
          <span>
            {data
              .filter((item) => item.status === 'processando')
              .reduce((acc, item) => acc + item.preco, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
      <div className="box mb">
        <GraficoVendas data={data} />
      </div>
    </section>
  );
};

export default Resumo;
