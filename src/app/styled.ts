import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-family: arial;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;

export const UpperDiv = styled.div`
  height: 50vh;
  width: 100vw;
  background: #191919;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottonDiv = styled.div`
  height: 50vh;
  width: 100vw;
  color: #191919;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  xMov: number;
  yMov: number;
}

export const Block = styled.div.attrs((p: Props) => ({
  style: {
    right: `${p.xMov}px`,
    bottom: `${p.yMov}px`,
  },
}))<Props>`
  position: relative;
  height: 40px;
  width: 40px;
  background: red;
`;
