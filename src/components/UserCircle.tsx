import React, { useEffect, useRef } from 'react';
import { Liver } from '../types/Liver';

interface UserCircleProps {
  users: Liver[];
}

const UserCircle: React.FC<UserCircleProps> = ({ users }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    // 画面幅に基づいてコンテナとアイコンのサイズを計算
    const viewportWidth = window.innerWidth;
    const margin = viewportWidth < 500 ? 20 : 40; // 画面幅が小さい場合は余白を縮小
    const baseSize = Math.min(500, viewportWidth - margin); // 画面の余白を考慮
    container.style.width = `${baseSize}px`;
    container.style.height = `${baseSize}px`;

    const centerX = baseSize / 2;
    const centerY = baseSize / 2;
    const maxRadius = Math.min(centerX, centerY) * 0.85;

    const sizeRatio = baseSize / 500; // 基準サイズ(500px)に対する比率

    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    const maxScore = sortedUsers[0].score;
    const minScore = sortedUsers[sortedUsers.length - 1].score;

    // 中心のアイコンを配置
    const centerUser = sortedUsers[0];
    const centerLink = document.createElement('a');
    centerLink.href = centerUser.yt;
    centerLink.target = '_blank';
    const centerIcon = document.createElement('img');
    centerIcon.classList.add('circle-icon');
    centerIcon.src = import.meta.env.BASE_URL + '/icon/' + centerUser.iconFile;
    const centerIconSize = Math.floor(110 * sizeRatio);
    centerIcon.style.width = `${centerIconSize}px`;
    centerIcon.style.height = `${centerIconSize}px`;
    centerIcon.style.left = `${centerX - centerIconSize / 2}px`;
    centerIcon.style.top = `${centerY - centerIconSize / 2}px`;
    centerIcon.style.zIndex = '100';
    centerLink.appendChild(centerIcon);
    container.appendChild(centerLink);

    // 周囲のアイコンを配置
    const rings = [5, 11, 15];
    let userIndex = 1;

    rings.forEach((ringCount) => {
      for (let i = 0; i < ringCount && userIndex < sortedUsers.length; i++) {
        const user = sortedUsers[userIndex++];
        const link = document.createElement('a');
        link.href = user.yt;
        link.target = '_blank';

        const icon = document.createElement('img');
        icon.classList.add('circle-icon');
        icon.src = import.meta.env.BASE_URL + '/icon/' + user.iconFile;

        const scoreRatio = (user.score - minScore) / (maxScore - minScore);
        const iconSize = Math.floor((90 + scoreRatio * 10) * sizeRatio);

        icon.style.width = `${iconSize}px`;
        icon.style.height = `${iconSize}px`;

        const angle = (i / ringCount) * 2 * Math.PI;
        const radiusOffset = (rings.indexOf(ringCount) + 1) * (maxRadius / 3.2); // 半径を縮小
        const radiusVariance = (Math.random() - 0.5) * (maxRadius / 9); // バリエーションを調整
        const radius = radiusOffset + radiusVariance;

        const x = centerX + radius * Math.cos(angle) - iconSize / 2;
        const y = centerY + radius * Math.sin(angle) - iconSize / 2;

        (icon as HTMLElement).style.left = `${x}px`;
        (icon as HTMLElement).style.top = `${y}px`;
        (icon as HTMLElement).style.zIndex = Math.floor(scoreRatio * 100).toString();

        link.appendChild(icon);
        container.appendChild(link);
      }
    });

    // コンテナのボーダーを削除して外側の円を非表示にする
    container.style.border = 'none';

    // アイコンを全体的に強調する（シャドウとボーダーを追加）
    const userIcons = container.querySelectorAll('.circle-icon');
    userIcons.forEach((icon) => {
      (icon as HTMLElement).style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
      (icon as HTMLElement).style.border = '2px solid white';
    });
  }, [users, window.innerWidth]); // window.innerWidthの変更も監視

  return (
    <div 
      id="circle-container" 
      ref={containerRef} 
      style={{ 
        position: 'relative',
        margin: '0 auto',
        width: '100%',
        maxWidth: '500px',
        aspectRatio: '1 / 1'
      }} 
    />
  );
};

export default UserCircle;