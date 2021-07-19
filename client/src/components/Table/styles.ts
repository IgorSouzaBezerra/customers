import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 10px;

  svg {
    cursor: pointer;
  }

  table {
    width: 100%;
    border-spacing: 0 8px;
    
    th {
      padding: 16px 32px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      color: var(--text-body);
    }
    
    td {
      padding: 16px 32px;
      color: var(--text-body);
      background: var(--shape);
      border: 0;
      border-radius: 4px;

      &:last-child {
        color: var(--text-title);
      }
    }
  }
`;