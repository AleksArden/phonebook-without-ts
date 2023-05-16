import styled from 'styled-components';

export const Item = styled.td`
  width: 150px;
  height: 30px;
  padding: 12px 4px;

  :nth-child(1) {
    width: 20px;
    line-height: 1;
  }
  :nth-child(2) {
    width: 280px;
  }
  :nth-child(3) {
    width: 20px;
    line-height: 1;
  }
  :nth-child(5) {
    width: 90px;
  }
  :nth-child(6) {
    width: 125px;
    padding-left: 15px;
  }
`;
export const TextWeight = styled.b`
  color: #800080;
`;
export const Text = styled.p`
  color: #800080;
`;
