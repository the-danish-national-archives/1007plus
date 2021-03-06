﻿namespace Rigsarkiv.AthenaForm
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
            this.mainTablesListBox = new System.Windows.Forms.ListBox();
            this.dataValues = new System.Windows.Forms.DataGridView();
            this.variableName = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Description = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.variableType = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.variableValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.columnType = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.columnValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Differences = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Errors = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.prevButton = new System.Windows.Forms.Button();
            this.nextButton = new System.Windows.Forms.Button();
            this.IndexButton = new System.Windows.Forms.Button();
            this.searchTextBox = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.codeTablesListBox = new System.Windows.Forms.ListBox();
            this.rowLabel = new System.Windows.Forms.Label();
            this.searchButton = new System.Windows.Forms.Button();
            this.tableInfoLabel = new System.Windows.Forms.Label();
            this.rowErrorsLabel = new System.Windows.Forms.Label();
            this.tableErrorsLabel = new System.Windows.Forms.Label();
            this.nextErrorButton = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.valueRichTextBox = new System.Windows.Forms.RichTextBox();
            this.prevErrorButton = new System.Windows.Forms.Button();
            this.titlelabel = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.codeListValues = new System.Windows.Forms.DataGridView();
            this.codeValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codeDescription = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codeListValue = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codeListDescription = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codeDifferences = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.codeErrors = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.infoLabel = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataValues)).BeginInit();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.codeListValues)).BeginInit();
            this.SuspendLayout();
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // mainTablesListBox
            // 
            this.mainTablesListBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.mainTablesListBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.mainTablesListBox.FormattingEnabled = true;
            this.mainTablesListBox.Location = new System.Drawing.Point(11, 52);
            this.mainTablesListBox.Name = "mainTablesListBox";
            this.mainTablesListBox.Size = new System.Drawing.Size(150, 290);
            this.mainTablesListBox.TabIndex = 3;
            this.mainTablesListBox.SelectedIndexChanged += new System.EventHandler(this.mainTablesListBox_SelectedIndexChanged);
            // 
            // dataValues
            // 
            this.dataValues.AllowUserToAddRows = false;
            this.dataValues.AllowUserToDeleteRows = false;
            this.dataValues.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataValues.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.dataValues.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataValues.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.variableName,
            this.Description,
            this.variableType,
            this.variableValue,
            this.columnType,
            this.columnValue,
            this.Differences,
            this.Errors});
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.SystemColors.Window;
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dataValues.DefaultCellStyle = dataGridViewCellStyle1;
            this.dataValues.Location = new System.Drawing.Point(365, 122);
            this.dataValues.Name = "dataValues";
            this.dataValues.RowHeadersVisible = false;
            this.dataValues.RowTemplate.ReadOnly = true;
            this.dataValues.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.dataValues.Size = new System.Drawing.Size(668, 439);
            this.dataValues.TabIndex = 5;
            this.dataValues.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataValues_CellClick);
            this.dataValues.SelectionChanged += new System.EventHandler(this.dataValues_SelectionChanged);
            // 
            // variableName
            // 
            this.variableName.HeaderText = "Variabelnavn";
            this.variableName.Name = "variableName";
            this.variableName.ReadOnly = true;
            this.variableName.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // Description
            // 
            this.Description.HeaderText = "Beskrivelse";
            this.Description.Name = "Description";
            this.Description.ReadOnly = true;
            this.Description.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // variableType
            // 
            this.variableType.HeaderText = "Datatype SIP";
            this.variableType.Name = "variableType";
            this.variableType.ReadOnly = true;
            this.variableType.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // variableValue
            // 
            this.variableValue.HeaderText = "Værdi";
            this.variableValue.Name = "variableValue";
            this.variableValue.ReadOnly = true;
            this.variableValue.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // columnType
            // 
            this.columnType.HeaderText = "Datatype AIP";
            this.columnType.Name = "columnType";
            this.columnType.ReadOnly = true;
            this.columnType.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // columnValue
            // 
            this.columnValue.HeaderText = "Værdi";
            this.columnValue.Name = "columnValue";
            this.columnValue.ReadOnly = true;
            this.columnValue.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // Differences
            // 
            this.Differences.HeaderText = "Formatændring";
            this.Differences.Name = "Differences";
            this.Differences.ReadOnly = true;
            this.Differences.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // Errors
            // 
            this.Errors.HeaderText = "Forskelle";
            this.Errors.Name = "Errors";
            this.Errors.ReadOnly = true;
            this.Errors.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // prevButton
            // 
            this.prevButton.Enabled = false;
            this.prevButton.Location = new System.Drawing.Point(539, 66);
            this.prevButton.Name = "prevButton";
            this.prevButton.Size = new System.Drawing.Size(47, 23);
            this.prevButton.TabIndex = 8;
            this.prevButton.Text = "Forrige";
            this.prevButton.UseVisualStyleBackColor = true;
            this.prevButton.Click += new System.EventHandler(this.prevButton_Click);
            // 
            // nextButton
            // 
            this.nextButton.Enabled = false;
            this.nextButton.Location = new System.Drawing.Point(591, 66);
            this.nextButton.Name = "nextButton";
            this.nextButton.Size = new System.Drawing.Size(47, 23);
            this.nextButton.TabIndex = 9;
            this.nextButton.Text = "Næste";
            this.nextButton.UseVisualStyleBackColor = true;
            this.nextButton.Click += new System.EventHandler(this.nextButton_Click);
            // 
            // IndexButton
            // 
            this.IndexButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.IndexButton.Location = new System.Drawing.Point(927, 567);
            this.IndexButton.Name = "IndexButton";
            this.IndexButton.Size = new System.Drawing.Size(105, 23);
            this.IndexButton.TabIndex = 10;
            this.IndexButton.Text = "Afslut konvertering";
            this.IndexButton.UseVisualStyleBackColor = true;
            this.IndexButton.Click += new System.EventHandler(this.IndexButton_Click);
            // 
            // searchTextBox
            // 
            this.searchTextBox.Location = new System.Drawing.Point(891, 66);
            this.searchTextBox.Name = "searchTextBox";
            this.searchTextBox.Size = new System.Drawing.Size(100, 20);
            this.searchTextBox.TabIndex = 11;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(9, 28);
            this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(86, 13);
            this.label4.TabIndex = 15;
            this.label4.Text = "Hovedtabeller";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(169, 28);
            this.label5.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(78, 13);
            this.label5.TabIndex = 16;
            this.label5.Text = "Kodetabeller";
            // 
            // codeTablesListBox
            // 
            this.codeTablesListBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.codeTablesListBox.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.codeTablesListBox.FormattingEnabled = true;
            this.codeTablesListBox.Location = new System.Drawing.Point(172, 52);
            this.codeTablesListBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.codeTablesListBox.Name = "codeTablesListBox";
            this.codeTablesListBox.Size = new System.Drawing.Size(147, 290);
            this.codeTablesListBox.TabIndex = 17;
            this.codeTablesListBox.SelectedIndexChanged += new System.EventHandler(this.codeTablesListBox_SelectedIndexChanged);
            // 
            // rowLabel
            // 
            this.rowLabel.AutoSize = true;
            this.rowLabel.Location = new System.Drawing.Point(362, 69);
            this.rowLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.rowLabel.Name = "rowLabel";
            this.rowLabel.Size = new System.Drawing.Size(50, 13);
            this.rowLabel.TabIndex = 19;
            this.rowLabel.Text = "rowLabel";
            // 
            // searchButton
            // 
            this.searchButton.Enabled = false;
            this.searchButton.Location = new System.Drawing.Point(995, 66);
            this.searchButton.Name = "searchButton";
            this.searchButton.Size = new System.Drawing.Size(35, 23);
            this.searchButton.TabIndex = 20;
            this.searchButton.Text = "Søg";
            this.searchButton.UseVisualStyleBackColor = true;
            this.searchButton.Click += new System.EventHandler(this.searchButton_Click);
            // 
            // tableInfoLabel
            // 
            this.tableInfoLabel.AutoSize = true;
            this.tableInfoLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.tableInfoLabel.Location = new System.Drawing.Point(361, 29);
            this.tableInfoLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.tableInfoLabel.Name = "tableInfoLabel";
            this.tableInfoLabel.Size = new System.Drawing.Size(111, 20);
            this.tableInfoLabel.TabIndex = 21;
            this.tableInfoLabel.Text = "tableInfoLabel";
            // 
            // rowErrorsLabel
            // 
            this.rowErrorsLabel.AutoSize = true;
            this.rowErrorsLabel.Location = new System.Drawing.Point(362, 98);
            this.rowErrorsLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.rowErrorsLabel.Name = "rowErrorsLabel";
            this.rowErrorsLabel.Size = new System.Drawing.Size(77, 13);
            this.rowErrorsLabel.TabIndex = 22;
            this.rowErrorsLabel.Text = "rowErrorsLabel";
            // 
            // tableErrorsLabel
            // 
            this.tableErrorsLabel.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.tableErrorsLabel.AutoSize = true;
            this.tableErrorsLabel.Location = new System.Drawing.Point(368, 572);
            this.tableErrorsLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.tableErrorsLabel.Name = "tableErrorsLabel";
            this.tableErrorsLabel.Size = new System.Drawing.Size(83, 13);
            this.tableErrorsLabel.TabIndex = 23;
            this.tableErrorsLabel.Text = "tableErrorsLabel";
            // 
            // nextErrorButton
            // 
            this.nextErrorButton.Enabled = false;
            this.nextErrorButton.Location = new System.Drawing.Point(635, 94);
            this.nextErrorButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.nextErrorButton.Name = "nextErrorButton";
            this.nextErrorButton.Size = new System.Drawing.Size(95, 23);
            this.nextErrorButton.TabIndex = 25;
            this.nextErrorButton.Text = "Næste forskel";
            this.nextErrorButton.UseVisualStyleBackColor = true;
            this.nextErrorButton.Click += new System.EventHandler(this.nextErrorButton_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(8, 407);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 13);
            this.label2.TabIndex = 26;
            this.label2.Text = "Værdi";
            // 
            // valueRichTextBox
            // 
            this.valueRichTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.valueRichTextBox.Location = new System.Drawing.Point(8, 422);
            this.valueRichTextBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.valueRichTextBox.Name = "valueRichTextBox";
            this.valueRichTextBox.Size = new System.Drawing.Size(334, 140);
            this.valueRichTextBox.TabIndex = 27;
            this.valueRichTextBox.Text = "";
            // 
            // prevErrorButton
            // 
            this.prevErrorButton.Enabled = false;
            this.prevErrorButton.Location = new System.Drawing.Point(539, 94);
            this.prevErrorButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.prevErrorButton.Name = "prevErrorButton";
            this.prevErrorButton.Size = new System.Drawing.Size(92, 23);
            this.prevErrorButton.TabIndex = 28;
            this.prevErrorButton.Text = "Forrige forskel";
            this.prevErrorButton.UseVisualStyleBackColor = true;
            this.prevErrorButton.Click += new System.EventHandler(this.prevErrorButton_Click);
            // 
            // titlelabel
            // 
            this.titlelabel.AutoSize = true;
            this.titlelabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.titlelabel.Location = new System.Drawing.Point(7, 6);
            this.titlelabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.titlelabel.Name = "titlelabel";
            this.titlelabel.Size = new System.Drawing.Size(200, 20);
            this.titlelabel.TabIndex = 29;
            this.titlelabel.Text = "{0} - Kontrol af konvertering";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.codeTablesListBox);
            this.groupBox1.Controls.Add(this.mainTablesListBox);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(8, 40);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Size = new System.Drawing.Size(334, 359);
            this.groupBox1.TabIndex = 30;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "TABELLER";
            // 
            // codeListValues
            // 
            this.codeListValues.AllowUserToAddRows = false;
            this.codeListValues.AllowUserToDeleteRows = false;
            this.codeListValues.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.codeListValues.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.codeListValues.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.codeListValues.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.codeValue,
            this.codeDescription,
            this.codeListValue,
            this.codeListDescription,
            this.codeDifferences,
            this.codeErrors});
            this.codeListValues.Location = new System.Drawing.Point(365, 122);
            this.codeListValues.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.codeListValues.Name = "codeListValues";
            this.codeListValues.RowHeadersVisible = false;
            this.codeListValues.RowTemplate.Height = 28;
            this.codeListValues.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.codeListValues.Size = new System.Drawing.Size(669, 439);
            this.codeListValues.TabIndex = 31;
            this.codeListValues.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.codeListValues_CellClick);
            // 
            // codeValue
            // 
            this.codeValue.HeaderText = "Kode (SIP)";
            this.codeValue.Name = "codeValue";
            this.codeValue.ReadOnly = true;
            this.codeValue.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // codeDescription
            // 
            this.codeDescription.HeaderText = "Kodeforklaring";
            this.codeDescription.Name = "codeDescription";
            this.codeDescription.ReadOnly = true;
            this.codeDescription.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // codeListValue
            // 
            this.codeListValue.HeaderText = "Kode (AIP)";
            this.codeListValue.Name = "codeListValue";
            this.codeListValue.ReadOnly = true;
            this.codeListValue.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // codeListDescription
            // 
            this.codeListDescription.HeaderText = "Kodeforklaring";
            this.codeListDescription.Name = "codeListDescription";
            this.codeListDescription.ReadOnly = true;
            this.codeListDescription.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // codeDifferences
            // 
            this.codeDifferences.HeaderText = "Formatændring";
            this.codeDifferences.Name = "codeDifferences";
            this.codeDifferences.ReadOnly = true;
            this.codeDifferences.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // codeErrors
            // 
            this.codeErrors.HeaderText = "Forskelle";
            this.codeErrors.Name = "codeErrors";
            this.codeErrors.ReadOnly = true;
            this.codeErrors.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.NotSortable;
            // 
            // infoLabel
            // 
            this.infoLabel.AutoSize = true;
            this.infoLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.infoLabel.Location = new System.Drawing.Point(340, 231);
            this.infoLabel.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.infoLabel.Name = "infoLabel";
            this.infoLabel.Size = new System.Drawing.Size(703, 20);
            this.infoLabel.TabIndex = 33;
            this.infoLabel.Text = "Klik på en tabel for at se data før (SIP) og efter (AIP) konvertering til arkiver" +
    "ingsversion";
            // 
            // Form2
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1041, 599);
            this.Controls.Add(this.infoLabel);
            this.Controls.Add(this.codeListValues);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.titlelabel);
            this.Controls.Add(this.prevErrorButton);
            this.Controls.Add(this.valueRichTextBox);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.nextErrorButton);
            this.Controls.Add(this.tableErrorsLabel);
            this.Controls.Add(this.rowErrorsLabel);
            this.Controls.Add(this.tableInfoLabel);
            this.Controls.Add(this.searchButton);
            this.Controls.Add(this.rowLabel);
            this.Controls.Add(this.searchTextBox);
            this.Controls.Add(this.IndexButton);
            this.Controls.Add(this.nextButton);
            this.Controls.Add(this.prevButton);
            this.Controls.Add(this.dataValues);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "Form2";
            this.Text = "ASTA";
            this.Shown += new System.EventHandler(this.Form2_Shown);
            ((System.ComponentModel.ISupportInitialize)(this.dataValues)).EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.codeListValues)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
        private System.Windows.Forms.ListBox mainTablesListBox;
        private System.Windows.Forms.DataGridView dataValues;
        private System.Windows.Forms.Button prevButton;
        private System.Windows.Forms.Button nextButton;
        private System.Windows.Forms.Button IndexButton;
        private System.Windows.Forms.TextBox searchTextBox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ListBox codeTablesListBox;
        private System.Windows.Forms.Label rowLabel;
        private System.Windows.Forms.Button searchButton;
        private System.Windows.Forms.Label tableInfoLabel;
        private System.Windows.Forms.Label rowErrorsLabel;
        private System.Windows.Forms.Label tableErrorsLabel;
        private System.Windows.Forms.Button nextErrorButton;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.RichTextBox valueRichTextBox;
        private System.Windows.Forms.Button prevErrorButton;
        private System.Windows.Forms.Label titlelabel;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.DataGridViewTextBoxColumn variableName;
        private System.Windows.Forms.DataGridViewTextBoxColumn Description;
        private System.Windows.Forms.DataGridViewTextBoxColumn variableType;
        private System.Windows.Forms.DataGridViewTextBoxColumn variableValue;
        private System.Windows.Forms.DataGridViewTextBoxColumn columnType;
        private System.Windows.Forms.DataGridViewTextBoxColumn columnValue;
        private System.Windows.Forms.DataGridViewTextBoxColumn Differences;
        private System.Windows.Forms.DataGridViewTextBoxColumn Errors;
        private System.Windows.Forms.DataGridView codeListValues;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeValue;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeDescription;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeListValue;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeListDescription;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeDifferences;
        private System.Windows.Forms.DataGridViewTextBoxColumn codeErrors;
        private System.Windows.Forms.Label infoLabel;
    }
}

