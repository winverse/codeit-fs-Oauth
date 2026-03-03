'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IMAGE_SIZES } from '@/constants/uiDimensions';
import * as styles from './CommentItem.css';
import { formatRelativeDate } from '@/utils';

export function CommentItem({ item, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);

  const handleSave = async () => {
    if (!editedContent.trim()) {
      return;
    }

    const isSaved = await onUpdate({
      commentId: item.id,
      content: editedContent.trim(),
    });
    if (isSaved) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(item.content);
    setIsEditing(false);
  };

  return (
    <>
      <article className={styles.item}>
        {isEditing ? (
          <>
            <textarea
              className={styles.textarea}
              value={editedContent}
              onChange={(event) => setEditedContent(event.target.value)}
            />

            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                type="button"
                className={styles.actionButton}
                onClick={handleSave}
              >
                수정 완료
              </button>
            </div>
          </>
        ) : (
          <p className={styles.content}>{item.content}</p>
        )}

        <div className={styles.profileRow}>
          <div className={styles.profile}>
            <div className={styles.profileImageWrap}>
              {item.writer?.image ? (
                <Image
                  src={item.writer.image}
                  alt={`${item.writer?.nickname ?? '작성자'} 프로필`}
                  width={IMAGE_SIZES.USER_AVATAR}
                  height={IMAGE_SIZES.USER_AVATAR}
                />
              ) : (
                <Image
                  src="/images/ui/ic_profile.svg"
                  alt="기본 프로필"
                  width={IMAGE_SIZES.USER_AVATAR}
                  height={IMAGE_SIZES.USER_AVATAR}
                />
              )}
            </div>

            <div>
              <p className={styles.nickname}>
                {item.writer?.nickname ?? '닉네임'}
              </p>
              <p className={styles.timestamp}>
                {formatRelativeDate(item.updatedAt)}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => setIsEditing(true)}
              >
                수정
              </button>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => onDelete(item.id)}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </article>

      <hr className={styles.divider} />
    </>
  );
}
