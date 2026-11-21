/**
 * The last section: a letter from the person who made Echo, saying why it
 * exists, and the ask as its P.S. People give to a person who wrote to them,
 * not to a list of facts, so the maker's letter and the support are one
 * moment.
 *
 * The letter is paper, an object, so it's allowed depth: lit by Echo's key
 * light from the top left with the same soft shadow as a cap, typed in the
 * mono face, the photo clipped to its corner. Its paper and ink are the
 * receipt's (the theme's text colour as paper, its surface as ink), a pair
 * the engine keeps legible on any seed. No wax seal or stamp: that's another
 * product's language.
 *
 * The photo is Noor's own: a face is what stops someone scrolling past, and
 * what they trust before they give. It's far down the page, so it loads only
 * as the letter comes near. The section is the page's second bookend, on the
 * seed's light like the hero. The guide peeks over the top of the paper.
 */
import { BigTitle } from "@/components/home/BigTitle";
import { GuideStop } from "@/components/home/Guide";
import { HardwareButton } from "@registry/echo/hardware-button";

function Pitch() {
  return (
    <>
      <p>
        Olá, eu sou o <strong>Isaac Lamego</strong>, fundador da <strong>Zack Studios</strong>. Ao longo de projetos
        com mais de 30 empresas em 6 países — conectando ERPs como Protheus, Tasy, Sênior e 4medic — vi o mesmo padrão
        se repetir: empresas sentadas sobre montanhas de dados, mas presas a planilhas manuais e decisões tardias.
      </p>
      <p>
        O mercado de IA corporativa hoje oferece dois extremos ruins: ferramentas de chat genéricas onde seus dados
        sensíveis vão para a nuvem de terceiros, ou soluções de milhões de dólares fora do alcance de operações reais.
      </p>
      <p>
        O <strong>GothamOS</strong> nasceu para fechar essa lacuna. Inspirado no rigor operacional do padrão Palantir
        Gotham, construímos uma camada soberana que roda <strong>100% local (on-premise via Docker/vLLM)</strong> ou na{" "}
        <strong>sua nuvem privada (VPC)</strong> — e entregamos o que realmente gera retorno: a instalação completa
        junto com um <strong>time de agentes corporativos</strong> desenhado para a sua operação.
      </p>
      <p>
        Atuação formalizada via Contrato de Prestação de Serviços, emissão fiscal regular e conformidade estrita com a
        LGPD desde a arquitetura.
      </p>
    </>
  );
}

export function Letter() {
  return (
    <section id="fundador" className="letter-sec" aria-labelledby="letter-h" data-guide-section="">
      <div className="letter-sec__inner">
        <div className="letter-sec__head">
          <BigTitle id="letter-h" title="Engenharia antes do espetáculo">
            <strong>Por trás do GothamOS:</strong> Zack Studios &amp; Isaac Lamego.
          </BigTitle>
        </div>

        <article className="letter" aria-label="Carta de Isaac Lamego sobre o GothamOS">
          <GuideStop className="letter__stop" />

          <p className="letter__date">
            <time dateTime="2026-11-21">Rio de Janeiro · Operação 100% remota (6 países)</time>
          </p>
          <Pitch />
          <p className="letter__sign">Isaac Lamego · Zack Studios</p>
          <ul className="letter__links">
            <li>
              <a href="https://wa.me/5521990315582" target="_blank" rel="noopener noreferrer">
                WhatsApp: +55 21 99031-5582
              </a>
            </li>
            <li>
              <a href="mailto:contato.zackstudio@gmail.com">contato.zackstudio@gmail.com</a>
            </li>
            <li>
              <a href="https://github.com/zackdartdev" target="_blank" rel="noopener noreferrer">
                GitHub · zackdartdev
              </a>
            </li>
          </ul>
          <p className="letter__ps">
            P.S. Quer rodar um piloto B2B do GothamOS (100% local ou VPC) com o primeiro squad de agentes da sua
            empresa? Fale direto comigo abaixo.
          </p>
          <div style={{ marginTop: "1.25rem" }}>
            <HardwareButton
              variant="primary"
              size="lg"
              href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20conversar%20sobre%20a%20implanta%C3%A7%C3%A3o%20do%20GothamOS%20na%20minha%20empresa."
            >
              Falar com Isaac no WhatsApp
            </HardwareButton>
          </div>
        </article>
      </div>
    </section>
  );
}
