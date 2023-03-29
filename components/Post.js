import Link from 'next/link';
import React from 'react';
import styles from './Post.module.css'

export default function Post({ props }) {
    return (
        <div className={styles['post-card-styling']}>
            <div>
                <p className={styles['card-title']}>{props.title}</p>
                <p>{props.text}</p>
                <div>
                    <Link href={`posts/${props.id}`} className={styles['card-link']}>More Details</Link>
                </div>
            </div>
        </div>
    );
}
