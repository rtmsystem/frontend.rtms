'use client'

// React Imports
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useEffect } from 'react'
import type { Editor } from '@tiptap/react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'

type PaymentDescriptionEditorProps = {
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  helperText?: string
  placeholder?: string
}

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isStrike: false,
          isLeftAligned: true,
          isCenterAligned: false,
          isRightAligned: false,
          isJustified: false
        }
      }

      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        isLeftAligned: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
        isCenterAligned: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
        isRightAligned: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
        isJustified: ctx.editor.isActive({ textAlign: 'justify' }) ?? false
      }
    }
  })

  if (!editor || !editorState) {
    return null
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 p-6'>
      <CustomIconButton
        {...(editorState.isBold && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <i className='tabler-bold' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isUnderline && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <i className='tabler-underline' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isItalic && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <i className='tabler-italic' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isStrike && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <i className='tabler-strikethrough' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isLeftAligned && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <i className='tabler-align-left' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isCenterAligned && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <i className='tabler-align-center' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isRightAligned && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <i className='tabler-align-right' />
      </CustomIconButton>
      <CustomIconButton
        {...(editorState.isJustified && { color: 'primary' })}
        variant='outlined'
        size='small'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <i className='tabler-align-justified' />
      </CustomIconButton>
    </div>
  )
}

const PaymentDescriptionEditor = ({
  value,
  onChange,
  error,
  helperText,
  placeholder
}: PaymentDescriptionEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Escribe aquí la descripción de los pagos e inscripciones...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    }
  })

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <Box>
      <Box
        sx={{
          border: error
            ? '2px solid var(--mui-palette-error-main)'
            : '1px solid var(--mui-palette-customColors-inputBorder)',
          borderRadius: 'var(--mui-shape-borderRadius)',
          minHeight: '200px',
          '&:hover': {
            borderColor: error
              ? 'var(--mui-palette-error-main)'
              : 'var(--mui-palette-action-active)'
          },
          '&:focus-within': {
            borderWidth: 2,
            borderColor: error
              ? 'var(--mui-palette-error-main)'
              : 'var(--mui-palette-primary-main)',
            boxShadow: error
              ? 'none'
              : 'var(--mui-customShadows-primary-sm)'
          }
        }}
      >
        <EditorToolbar editor={editor} />
        <Divider />
        <Box
          sx={{
            '& .ProseMirror': {
              outline: 'none',
              minHeight: '180px',
              padding: '16px',
              '& p': {
                margin: '4px 0',
                '&.is-editor-empty:first-child::before': {
                  color: 'var(--mui-palette-text-disabled)',
                  content: 'attr(data-placeholder)',
                  float: 'left',
                  height: 0,
                  pointerEvents: 'none'
                }
              },
              '& ul, & ol': {
                paddingLeft: '24px'
              },
              '& h1, & h2, & h3': {
                marginTop: '8px',
                marginBottom: '4px'
              }
            }
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>
      {helperText && (
        <Typography
          variant='caption'
          sx={{
            color: error ? 'var(--mui-palette-error-main)' : 'var(--mui-palette-text-secondary)',
            marginTop: '4px',
            marginLeft: '14px'
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  )
}

export default PaymentDescriptionEditor
