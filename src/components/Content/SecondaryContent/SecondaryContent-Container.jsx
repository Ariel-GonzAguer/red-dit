// SecondaryContent.jsx
import React, { useEffect } from 'react'
import styles from '../Content.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { setSubcategories } from '../../../redux/SubcategoriesSlice'
import { subcategoriesSelector, subcategoriesErrorSelector, subcategoriesLoadingSelector } from '../../../redux/SubcategoriesSlice'
import Categories from './Categories'

export default function SecondaryContent() {
  const dispatch = useDispatch()
  const subcategories = useSelector(subcategoriesSelector)
  const subcategoriesLoading = useSelector(subcategoriesLoadingSelector)
  const subcategoriesError = useSelector(subcategoriesErrorSelector)

  useEffect(() => {
    dispatch(setSubcategories());
    // console.log(subcategories)
  }, [dispatch])

  return (
    <section className={styles.secondaryContent}>
      <h2>Subcategories</h2>
      {subcategoriesError && <h2>{subcategoriesErrorSelector}</h2>}

      {
        subcategoriesLoading
          ? <h2>Loading...</h2>
          :
          (<ul>
            <Categories categories={subcategories} />
          </ul >)
      }

    </section>
  )
}