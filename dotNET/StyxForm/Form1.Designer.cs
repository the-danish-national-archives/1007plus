﻿namespace Rigsarkiv.StyxForm
{
    partial class Form1
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
            this.components = new System.ComponentModel.Container();
            this.outputRichTextBox = new System.Windows.Forms.RichTextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.sipTextBox = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.sipNameTextBox = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.aipTextBox = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.sipButton = new System.Windows.Forms.Button();
            this.aipButton = new System.Windows.Forms.Button();
            this.logButton = new System.Windows.Forms.Button();
            this.convertButton = new System.Windows.Forms.Button();
            this.aipPathRequired = new System.Windows.Forms.ErrorProvider(this.components);
            this.sipPathRequired = new System.Windows.Forms.ErrorProvider(this.components);
            this.sipNameRequired = new System.Windows.Forms.ErrorProvider(this.components);
            this.label5 = new System.Windows.Forms.Label();
            this.scriptTypeComboBox = new System.Windows.Forms.ComboBox();
            this.reportButton = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.aipPathRequired)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.sipPathRequired)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.sipNameRequired)).BeginInit();
            this.SuspendLayout();
            // 
            // outputRichTextBox
            // 
            this.outputRichTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.outputRichTextBox.Location = new System.Drawing.Point(19, 244);
            this.outputRichTextBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.outputRichTextBox.Name = "outputRichTextBox";
            this.outputRichTextBox.Size = new System.Drawing.Size(642, 158);
            this.outputRichTextBox.TabIndex = 0;
            this.outputRichTextBox.Text = "";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(15, 6);
            this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(222, 20);
            this.label4.TabIndex = 16;
            this.label4.Text = "Konverter til udleveringsformat";
            // 
            // sipTextBox
            // 
            this.sipTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.sipTextBox.Location = new System.Drawing.Point(18, 141);
            this.sipTextBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.sipTextBox.Name = "sipTextBox";
            this.sipTextBox.Size = new System.Drawing.Size(566, 20);
            this.sipTextBox.TabIndex = 22;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(15, 126);
            this.label3.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(197, 13);
            this.label3.TabIndex = 21;
            this.label3.Text = "Vælg DIP destination (drev eller mappe):";
            // 
            // sipNameTextBox
            // 
            this.sipNameTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.sipNameTextBox.Location = new System.Drawing.Point(18, 94);
            this.sipNameTextBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.sipNameTextBox.Name = "sipNameTextBox";
            this.sipNameTextBox.Size = new System.Drawing.Size(566, 20);
            this.sipNameTextBox.TabIndex = 20;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(17, 79);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(167, 13);
            this.label2.TabIndex = 19;
            this.label2.Text = "Angiv DIP-ID, fx. DIP.12345 (DIP)";
            // 
            // aipTextBox
            // 
            this.aipTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.aipTextBox.Location = new System.Drawing.Point(18, 48);
            this.aipTextBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.aipTextBox.Name = "aipTextBox";
            this.aipTextBox.Size = new System.Drawing.Size(566, 20);
            this.aipTextBox.TabIndex = 18;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(15, 33);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(256, 13);
            this.label1.TabIndex = 17;
            this.label1.Text = "Vælg arkiveringsversion - fx. AVID.SA.12345.1 (AIP):";
            // 
            // sipButton
            // 
            this.sipButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.sipButton.Location = new System.Drawing.Point(588, 141);
            this.sipButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.sipButton.Name = "sipButton";
            this.sipButton.Size = new System.Drawing.Size(73, 21);
            this.sipButton.TabIndex = 24;
            this.sipButton.Text = "Browse";
            this.sipButton.UseVisualStyleBackColor = true;
            this.sipButton.Click += new System.EventHandler(this.sipButton_Click);
            // 
            // aipButton
            // 
            this.aipButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.aipButton.Location = new System.Drawing.Point(588, 48);
            this.aipButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.aipButton.Name = "aipButton";
            this.aipButton.Size = new System.Drawing.Size(73, 21);
            this.aipButton.TabIndex = 23;
            this.aipButton.Text = "Browse";
            this.aipButton.UseVisualStyleBackColor = true;
            this.aipButton.Click += new System.EventHandler(this.aipButton_Click);
            // 
            // logButton
            // 
            this.logButton.Enabled = false;
            this.logButton.Location = new System.Drawing.Point(18, 219);
            this.logButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.logButton.Name = "logButton";
            this.logButton.Size = new System.Drawing.Size(73, 21);
            this.logButton.TabIndex = 26;
            this.logButton.Text = "Vis Log";
            this.logButton.UseVisualStyleBackColor = true;
            this.logButton.Click += new System.EventHandler(this.logButton_Click);
            // 
            // convertButton
            // 
            this.convertButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.convertButton.Location = new System.Drawing.Point(588, 219);
            this.convertButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.convertButton.Name = "convertButton";
            this.convertButton.Size = new System.Drawing.Size(73, 21);
            this.convertButton.TabIndex = 25;
            this.convertButton.Text = "Konverter til DIP";
            this.convertButton.UseVisualStyleBackColor = true;
            this.convertButton.Click += new System.EventHandler(this.convertButton_Click);
            // 
            // aipPathRequired
            // 
            this.aipPathRequired.ContainerControl = this;
            // 
            // sipPathRequired
            // 
            this.sipPathRequired.ContainerControl = this;
            // 
            // sipNameRequired
            // 
            this.sipNameRequired.ContainerControl = this;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(15, 180);
            this.label5.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(102, 13);
            this.label5.TabIndex = 27;
            this.label5.Text = "Vælg statistikformat:";
            // 
            // scriptTypeComboBox
            // 
            this.scriptTypeComboBox.FormattingEnabled = true;
            this.scriptTypeComboBox.Location = new System.Drawing.Point(118, 177);
            this.scriptTypeComboBox.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.scriptTypeComboBox.Name = "scriptTypeComboBox";
            this.scriptTypeComboBox.Size = new System.Drawing.Size(73, 21);
            this.scriptTypeComboBox.TabIndex = 28;
            // 
            // reportButton
            // 
            this.reportButton.Enabled = false;
            this.reportButton.Location = new System.Drawing.Point(118, 219);
            this.reportButton.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.reportButton.Name = "reportButton";
            this.reportButton.Size = new System.Drawing.Size(73, 21);
            this.reportButton.TabIndex = 29;
            this.reportButton.Text = "Vis Rapport";
            this.reportButton.UseVisualStyleBackColor = true;
            this.reportButton.Click += new System.EventHandler(this.reportButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(684, 413);
            this.Controls.Add(this.reportButton);
            this.Controls.Add(this.scriptTypeComboBox);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.logButton);
            this.Controls.Add(this.convertButton);
            this.Controls.Add(this.sipButton);
            this.Controls.Add(this.aipButton);
            this.Controls.Add(this.sipTextBox);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.sipNameTextBox);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.aipTextBox);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.outputRichTextBox);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.MinimumSize = new System.Drawing.Size(500, 400);
            this.Name = "Form1";
            this.Text = "ASTA";
            this.Shown += new System.EventHandler(this.Form1_Shown);
            ((System.ComponentModel.ISupportInitialize)(this.aipPathRequired)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.sipPathRequired)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.sipNameRequired)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.RichTextBox outputRichTextBox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox sipTextBox;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox sipNameTextBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox aipTextBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button sipButton;
        private System.Windows.Forms.Button aipButton;
        private System.Windows.Forms.Button logButton;
        private System.Windows.Forms.Button convertButton;
        private System.Windows.Forms.ErrorProvider aipPathRequired;
        private System.Windows.Forms.ErrorProvider sipPathRequired;
        private System.Windows.Forms.ErrorProvider sipNameRequired;
        private System.Windows.Forms.ComboBox scriptTypeComboBox;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Button reportButton;
    }
}

