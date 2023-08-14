// pages/index.js
import Layout from '@/components/Layout';
import UserForm from '@/components/Forms/User';
import BookForm from '@/components/Forms/Book';
import PlotForm from '@/components/Forms/Plot';
import WorldBuildingForm from '@/components/Forms/WorldBuilding';
import CharacterForm from '@/components/Forms/Character';
import OpenAIPlugin from '@/components/Plugins/OpenAI';

export default function Home() {
  return (
    <Layout>
      <div className="content">
        <h1>Bem-vindo ao Meu App</h1>
        <p>Crie usuários, livros, plots, worldbuildings e personagens.</p>
        
        <h2>Criar Usuário</h2>
        <UserForm />
        
        <h2>Criar Livro</h2>
        <BookForm />
        
        <h2>Criar Plot</h2>
        <PlotForm />
        
        <h2>Criar Worldbuilding</h2>
        <WorldBuildingForm />
        
        <h2>Criar Personagem</h2>
        <CharacterForm />
        
        <h2>Gerar Insights com OpenAI</h2>
        <OpenAIPlugin />
      </div>

      <style jsx>{`
        .content {
          margin: 20px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 20px;
          margin-top: 20px;
        }
      `}</style>
    </Layout>
  );
}
